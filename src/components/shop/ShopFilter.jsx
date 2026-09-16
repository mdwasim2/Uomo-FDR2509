import { useState, useMemo } from "react";
import { ChevronUp, ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";

const CATEGORIES = [
  "Dresses", "Sweatshirts", "Jackets", "Jeans", "Men",
  "Shorts", "Swimwear", "T-Shirts & Tops", "Trousers", "Jumpers & Cardigans",
];

const COLORS = [
  { name: "Navy", hex: "#22304A" },
  { name: "Black", hex: "#151515" },
  { name: "Yellow", hex: "#E9C46A" },
  { name: "Sky", hex: "#A9C7D8" },
  { name: "Brown", hex: "#8A5A34" },
  { name: "Pink", hex: "#E9B4B0" },
  { name: "Gray", hex: "#BDBDBD" },
  { name: "Mint", hex: "#B7CDBB" },
];

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const BRANDS = [
  { name: "Adidas", count: 2 },
  { name: "Balmain", count: 7 },
  { name: "Balenciaga", count: 10 },
  { name: "Burberry", count: 39 },
  { name: "Kenzo", count: 95 },
  { name: "Givenchy", count: 1092 },
  { name: "Zara", count: 48 },
];

const PRICE_MIN = 29;
const PRICE_MAX = 937;

function SectionHeader({ title, open, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between py-2 text-left"
      aria-expanded={open}
    >
      <span className="text-sm font-semibold tracking-wide text-[var(--color-primary)]">
        {title}
      </span>
      {open ? (
        <ChevronUp className="h-4 w-4 text-[var(--color-primary)]" strokeWidth={2} />
      ) : (
        <ChevronDown className="h-4 w-4 text-[var(--color-primary)]" strokeWidth={2} />
      )}
    </button>
  );
}

function Section({ title, open, onToggle, children }) {
  return (
    <div className="border-b border-black/10 py-5 first:pt-0">
      <SectionHeader title={title} open={open} onToggle={onToggle} />
      {open && <div className="mt-4">{children}</div>}
    </div>
  );
}

export default function ProductSidebar({ onChange }) {
  const [open, setOpen] = useState({
    categories: true,
    color: true,
    sizes: true,
    brands: true,
    price: true,
  });

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeColor, setActiveColor] = useState("Gray");
  const [activeSize, setActiveSize] = useState(null);
  const [brandSearch, setBrandSearch] = useState("");
  const [checkedBrands, setCheckedBrands] = useState([]);
  const [minPrice, setMinPrice] = useState(PRICE_MIN);
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX);

  const toggleSection = (key) =>
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  const toggleBrand = (name) =>
    setCheckedBrands((prev) =>
      prev.includes(name) ? prev.filter((b) => b !== name) : [...prev, name]
    );

  const filteredBrands = useMemo(
    () =>
      BRANDS.filter((b) =>
        b.name.toLowerCase().includes(brandSearch.trim().toLowerCase())
      ),
    [brandSearch]
  );

  const handlePriceChange = (which, value) => {
    const num = Number(value);
    if (which === "min") setMinPrice(Math.min(num, maxPrice));
    else setMaxPrice(Math.max(num, minPrice));
  };

  return (
    <div className="w-full font-[family-name:var(--font-jost)] lg:w-auto">
      {/* Mobile trigger */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="mb-4 flex w-full items-center justify-center gap-2 border border-black/15 py-3 text-sm font-medium tracking-wide text-[var(--color-primary)] lg:hidden"
      >
        <SlidersHorizontal className="h-4 w-4" />
        FILTERS
      </button>

      {/* Overlay (mobile only) */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar panel:
          - mobile: fixed slide-in drawer, hidden unless mobileOpen
          - desktop (lg+): static, always visible */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-[85%] max-w-[320px] overflow-y-auto bg-white px-6 py-6 shadow-xl transition-transform duration-300 ease-in-out
        ${mobileOpen ? "translate-x-0" : "translate-x-full"}
        lg:static lg:z-auto lg:h-auto lg:w-[280px] lg:max-w-[280px] lg:translate-x-0 lg:overflow-visible lg:px-0 lg:py-0 lg:shadow-none`}
      >
        <div className="mb-4 flex items-center justify-between lg:hidden">
          <span className="text-sm font-semibold text-[var(--color-primary)]">FILTERS</span>
          <button type="button" onClick={() => setMobileOpen(false)}>
            <X className="h-5 w-5 text-[var(--color-primary)]" />
          </button>
        </div>

        <div className="text-[var(--color-primary)]">
          {/* Categories */}
          <Section
            title="PRODUCT CATEGORIES"
            open={open.categories}
            onToggle={() => toggleSection("categories")}
          >
            <ul className="space-y-3">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <button
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`text-sm transition-colors hover:text-[var(--color-primary)] ${
                      activeCategory === cat
                        ? "font-medium text-[var(--color-primary)]"
                        : "text-[var(--color-gray)]"
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </Section>

          {/* Color */}
          <Section title="COLOR" open={open.color} onToggle={() => toggleSection("color")}>
            <div className="flex flex-wrap gap-3">
              {COLORS.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  aria-label={c.name}
                  onClick={() => setActiveColor(c.name)}
                  className="flex h-7 w-7 items-center justify-center rounded-full"
                  style={{
                    boxShadow: activeColor === c.name ? `0 0 0 1.5px ${c.hex}` : "none",
                  }}
                >
                  <span
                    className="h-5 w-5 rounded-full"
                    style={{
                      backgroundColor: c.hex,
                      border: activeColor === c.name ? "2px solid white" : "none",
                      boxShadow: activeColor === c.name ? `0 0 0 1.5px ${c.hex}` : "none",
                    }}
                  />
                </button>
              ))}
            </div>
          </Section>

          {/* Sizes */}
          <Section title="SIZES" open={open.sizes} onToggle={() => toggleSection("sizes")}>
            <div className="grid grid-cols-3 gap-3 xs:grid-cols-4">
              {SIZES.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setActiveSize(size)}
                  className={`flex h-10 items-center justify-center border text-sm transition-colors ${
                    activeSize === size
                      ? "border-[var(--color-primary)] text-[var(--color-primary)]"
                      : "border-black/10 text-[var(--color-primary)] hover:border-[var(--color-primary)]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </Section>

          {/* Brands */}
          <Section title="BRANDS" open={open.brands} onToggle={() => toggleSection("brands")}>
            <div className="relative mb-4">
              <input
                type="text"
                value={brandSearch}
                onChange={(e) => setBrandSearch(e.target.value)}
                placeholder="Search"
                className="w-full border border-black/10 bg-transparent py-2 pr-9 pl-3 text-sm text-[var(--color-primary)] placeholder:text-[var(--color-gray)] focus:border-[var(--color-primary)] focus:outline-none"
              />
              <Search className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-[var(--color-gray)]" />
            </div>

            <ul className="max-h-56 space-y-3 overflow-y-auto lg:max-h-none lg:overflow-visible">
              {filteredBrands.map((brand) => (
                <li key={brand.name} className="flex items-center justify-between">
                  <label className="flex cursor-pointer items-center gap-3 text-sm text-[var(--color-primary)]">
                    <input
                      type="checkbox"
                      checked={checkedBrands.includes(brand.name)}
                      onChange={() => toggleBrand(brand.name)}
                      className="h-4 w-4 rounded-none border border-black/20 accent-[var(--color-primary)]"
                    />
                    {brand.name}
                  </label>
                  <span className="text-sm text-[var(--color-gray)]">{brand.count}</span>
                </li>
              ))}
              {filteredBrands.length === 0 && (
                <li className="text-sm text-[var(--color-gray)]">No brands found</li>
              )}
            </ul>
          </Section>

          {/* Price */}
          <Section title="PRICE" open={open.price} onToggle={() => toggleSection("price")}>
            <div className="px-1">
              <div className="relative h-1 w-full rounded-full bg-black/10">
                <div
                  className="absolute h-1 rounded-full bg-[var(--color-primary)]"
                  style={{
                    left: `${((minPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100}%`,
                    right: `${100 - ((maxPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100}%`,
                  }}
                />
                <input
                  type="range"
                  min={PRICE_MIN}
                  max={PRICE_MAX}
                  value={minPrice}
                  onChange={(e) => handlePriceChange("min", e.target.value)}
                  className="range-thumb pointer-events-none absolute inset-0 h-1 w-full appearance-none bg-transparent"
                />
                <input
                  type="range"
                  min={PRICE_MIN}
                  max={PRICE_MAX}
                  value={maxPrice}
                  onChange={(e) => handlePriceChange("max", e.target.value)}
                  className="range-thumb pointer-events-none absolute inset-0 h-1 w-full appearance-none bg-transparent"
                />
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-2 text-sm text-[var(--color-gray)]">
                <span>Min Price: ${minPrice}</span>
                <span>Max Price: ${maxPrice}</span>
              </div>
            </div>

            <style>{`
              .range-thumb::-webkit-slider-thumb {
                pointer-events: auto;
                -webkit-appearance: none;
                appearance: none;
                height: 14px;
                width: 14px;
                border-radius: 9999px;
                background: var(--color-primary);
                border: 2px solid white;
                box-shadow: 0 0 0 1px var(--color-primary);
                cursor: pointer;
              }
              .range-thumb::-moz-range-thumb {
                pointer-events: auto;
                height: 14px;
                width: 14px;
                border-radius: 9999px;
                background: var(--color-primary);
                border: 2px solid white;
                box-shadow: 0 0 0 1px var(--color-primary);
                cursor: pointer;
              }
              .range-thumb::-webkit-slider-runnable-track {
                background: transparent;
              }
            `}</style>
          </Section>
        </div>
      </aside>
    </div>
  );
}