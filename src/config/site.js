/**
 * site.js — Brand configuration
 * ─────────────────────────────
 * This is the ONLY file you need to change when adapting the template
 * to a new brand. Update the values below and swap the logo asset.
 */

export const SITE_CONFIG = {
  /** Brand display name */
  name: "Mayysa",

  /** Announcement bar message — use || to separate bold segments from normal */
  announcement: {
    // segments: { text, bold }
    segments: [
      { text: "FREE", bold: true },
      { text: " SHIPPING FOR ALL ", bold: false },
      { text: "ORDERS", bold: true },
      { text: " OVER ", bold: false },
      { text: "AED 150", bold: true },
    ],
  },

  /** Main navigation links — add dropdownItems[] for hover mega-menu */
  navLinks: [
    {
      label: "SKINCARE",
      to: "/collections/skincare",
      dropdownItems: [
        { label: "Moisturizers", to: "/collections/skincare/moisturizers" },
        { label: "Serums", to: "/collections/skincare/serums" },
        { label: "Cleansers", to: "/collections/skincare/cleansers" },
        { label: "Toners", to: "/collections/skincare/toners" },
        { label: "Eye Creams", to: "/collections/skincare/eye-creams" },
        { label: "Sunscreen & SPF", to: "/collections/skincare/sunscreen" },
        { label: "Face Masks", to: "/collections/skincare/face-masks" },
      ],
    },
    {
      label: "HAIR PRODUCTS",
      to: "/collections/hair-products",
      dropdownItems: [
        { label: "Shampoos", to: "/collections/hair-products/shampoos" },
        { label: "Conditioners", to: "/collections/hair-products/conditioners" },
        { label: "Hair Masks", to: "/collections/hair-products/hair-masks" },
        { label: "Hair Oils", to: "/collections/hair-products/hair-oils" },
        { label: "Styling", to: "/collections/hair-products/styling" },
        { label: "Hair Loss", to: "/collections/hair-products/hair-loss" },
      ],
    },
    {
      label: "HEALTH CARE",
      to: "/collections/health-care",
      dropdownItems: [
        { label: "Vitamins & Supplements", to: "/collections/health-care/vitamins" },
        { label: "Feminine Care", to: "/collections/health-care/feminine-care" },
        { label: "Oral Care", to: "/collections/health-care/oral-care" },
        { label: "Hand Sanitizers", to: "/collections/health-care/sanitizers" },
        { label: "Pain Relief", to: "/collections/health-care/pain-relief" },
      ],
    },
    {
      label: "BATH & BODY CARE",
      to: "/collections/bath-body-care",
      dropdownItems: [
        { label: "Body Lotions", to: "/collections/bath-body-care/lotions" },
        { label: "Shower Gels", to: "/collections/bath-body-care/shower-gels" },
        { label: "Scrubs", to: "/collections/bath-body-care/scrubs" },
        { label: "Deodorants", to: "/collections/bath-body-care/deodorants" },
        { label: "Hand & Foot Care", to: "/collections/bath-body-care/hand-foot" },
      ],
    },
    {
      label: "FRAGRANCE",
      to: "/collections/fragrance",
      dropdownItems: [
        { label: "Perfumes", to: "/collections/fragrance/perfumes" },
        { label: "Eau de Toilette", to: "/collections/fragrance/edt" },
        { label: "Body Mists", to: "/collections/fragrance/body-mists" },
        { label: "Oud & Oriental", to: "/collections/fragrance/oud" },
        { label: "Gift Sets", to: "/collections/fragrance/gift-sets" },
      ],
    },
    {
      label: "MAKEUP",
      to: "/collections/makeup",
      dropdownItems: [
        { label: "Foundation & Concealer", to: "/collections/makeup/foundation" },
        { label: "Lip Products", to: "/collections/makeup/lips" },
        { label: "Eye Makeup", to: "/collections/makeup/eyes" },
        { label: "Blush & Bronzer", to: "/collections/makeup/blush" },
        { label: "Setting & Primers", to: "/collections/makeup/setting" },
        { label: "Brushes & Tools", to: "/collections/makeup/tools" },
      ],
    },
    {
      label: "ACCESSORIES & LENSES",
      to: "/collections/accessories-lenses",
      dropdownItems: [
        { label: "Contact Lenses", to: "/collections/accessories-lenses/lenses" },
        { label: "Lens Solutions", to: "/collections/accessories-lenses/solutions" },
        { label: "Beauty Accessories", to: "/collections/accessories-lenses/accessories" },
        { label: "Hair Accessories", to: "/collections/accessories-lenses/hair" },
      ],
    },
  ],

  /** Supported currencies */
  currencies: [
    { code: "AED", label: "AED — UAE Dirham" },
    { code: "USD", label: "USD — US Dollar" },
    { code: "SAR", label: "SAR — Saudi Riyal" },
  ],

  defaultCurrency: "AED",
};
