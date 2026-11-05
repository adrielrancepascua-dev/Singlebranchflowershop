import type { FlowerProduct } from '../types/flower-product';
import type { FlowerBranchOption, FlowerInventoryMovementRow } from '../types/flower-inventory';
import type { FlowerOrder } from '../types/flower-order';
import type { FlowerStaffExpense, FlowerSupplierCost } from '../types/flower-expense';
import type { FlowerUser } from '../types/auth';

export type FlowerStemCatalogItem = FlowerProduct;

/** The only location this back office runs. */
export const SINGLE_BRANCH_ID = 'branch-dagupan';
export const SINGLE_BRANCH_NAME = 'Dagupan';

const MANILA_TZ = 'Asia/Manila';

export function manilaDateKey(dayOffset = 0): string {
  const today = new Date().toLocaleDateString('en-CA', { timeZone: MANILA_TZ });
  const [year, month, day] = today.split('-').map(Number);
  const shifted = new Date(Date.UTC(year, month - 1, day + dayOffset));
  return shifted.toISOString().slice(0, 10);
}

/** Clock time on a Manila calendar day, returned as an ISO timestamp. */
export function manilaIso(dayOffset = 0, hour = 10, minute = 0): string {
  const [year, month, day] = manilaDateKey(dayOffset).split('-').map(Number);
  const utcMs = Date.UTC(year, month - 1, day, hour, minute) - 8 * 60 * 60 * 1000;
  return new Date(utcMs).toISOString();
}

const SEEDED_AT = manilaIso(0, 7, 0);

export const FLOWER_BRANCHES_MOCK: FlowerBranchOption[] = [
  { id: SINGLE_BRANCH_ID, name: SINGLE_BRANCH_NAME, is_active: true },
];

export const FLOWER_STEMS_MOCK: FlowerStemCatalogItem[] = [
  { id: 'stem-rose-red', name: 'Local Rose', flower_type: 'Local Rose', product_kind: 'flower', color: 'Red', unit_cost: 45, is_active: true, created_at: SEEDED_AT },
  { id: 'stem-rose-pink', name: 'Local Rose', flower_type: 'Local Rose', product_kind: 'flower', color: 'Pink', unit_cost: 45, is_active: true, created_at: SEEDED_AT },
  { id: 'stem-rose-white', name: 'Local Rose', flower_type: 'Local Rose', product_kind: 'flower', color: 'White', unit_cost: 48, is_active: true, created_at: SEEDED_AT },
  { id: 'stem-tulip', name: 'Tulip', flower_type: 'Tulip', product_kind: 'flower', color: 'Mixed', unit_cost: 55, is_active: true, created_at: SEEDED_AT },
  { id: 'stem-sunflower', name: 'Sunflower', flower_type: 'Sunflower', product_kind: 'flower', color: 'Yellow', unit_cost: 40, is_active: true, created_at: SEEDED_AT },
  { id: 'stem-carnation', name: 'Carnation', flower_type: 'Carnation', product_kind: 'flower', color: 'Pink', unit_cost: 35, is_active: true, created_at: SEEDED_AT },
  { id: 'stem-lily', name: 'Lily', flower_type: 'Lily', product_kind: 'flower', color: 'White', unit_cost: 60, is_active: true, created_at: SEEDED_AT },
  { id: 'stem-babys-breath', name: "Baby's Breath", flower_type: "Baby's Breath", product_kind: 'flower', color: 'White', unit_cost: 25, is_active: true, created_at: SEEDED_AT },
  { id: 'stem-eucalyptus', name: 'Eucalyptus', flower_type: 'Eucalyptus', product_kind: 'flower', color: 'Green', unit_cost: 30, is_active: true, created_at: SEEDED_AT },
  { id: 'stem-hydrangea', name: 'Hydrangea', flower_type: 'Hydrangea', product_kind: 'flower', color: 'Blue', unit_cost: 75, is_active: true, created_at: SEEDED_AT },
  { id: 'stem-gerbera', name: 'Gerbera', flower_type: 'Gerbera', product_kind: 'flower', color: 'Orange', unit_cost: 38, is_active: true, created_at: SEEDED_AT },
  { id: 'stem-chrysanthemum', name: 'Chrysanthemum', flower_type: 'Chrysanthemum', product_kind: 'flower', color: 'Yellow', unit_cost: 32, is_active: true, created_at: SEEDED_AT },
  { id: 'misc-kraft', name: 'Kraft paper wrap', flower_type: 'Wrappers', product_kind: 'misc', color: '', unit_cost: 18, is_active: true, created_at: SEEDED_AT },
  { id: 'misc-korean', name: 'Korean wrapping paper', flower_type: 'Wrappers', product_kind: 'misc', color: '', unit_cost: 25, is_active: true, created_at: SEEDED_AT },
  { id: 'misc-ribbon', name: 'Satin ribbon', flower_type: 'Wrappers', product_kind: 'misc', color: '', unit_cost: 12, is_active: true, created_at: SEEDED_AT },
  { id: 'misc-card', name: 'Greeting card', flower_type: 'Gift items', product_kind: 'misc', color: '', unit_cost: 35, is_active: true, created_at: SEEDED_AT },
  { id: 'misc-vase', name: 'Glass bud vase', flower_type: 'Gift items', product_kind: 'misc', color: '', unit_cost: 180, is_active: true, created_at: SEEDED_AT },
  { id: 'misc-teddy', name: 'Mini teddy', flower_type: 'Gift items', product_kind: 'misc', color: '', unit_cost: 95, is_active: true, created_at: SEEDED_AT },
];

export const FLOWER_INVENTORY_SEED: Record<string, Record<string, number>> = {
  [SINGLE_BRANCH_ID]: {
    'stem-rose-red': 86,
    'stem-rose-pink': 64,
    'stem-rose-white': 42,
    'stem-tulip': 28,
    'stem-sunflower': 36,
    'stem-carnation': 90,
    'stem-lily': 22,
    'stem-babys-breath': 70,
    'stem-eucalyptus': 48,
    'stem-hydrangea': 14,
    'stem-gerbera': 40,
    'stem-chrysanthemum': 55,
    'misc-kraft': 120,
    'misc-korean': 80,
    'misc-ribbon': 150,
    'misc-card': 60,
    'misc-vase': 11,
    'misc-teddy': 8,
  },
};

export const FLOWER_DEMO_USERS: Array<
  FlowerUser & { password: string; branch_name?: string | null }
> = [
  {
    id: 'user-admin',
    email: 'admin@papersandpetals.ph',
    display_name: 'Shop Admin',
    role: 'admin',
    branch_id: SINGLE_BRANCH_ID,
    branch_name: SINGLE_BRANCH_NAME,
    onboarding_completed: true,
    is_active: true,
    password: 'admin1234',
  },
];

function sampleOrder(order: FlowerOrder): FlowerOrder {
  return order;
}

export function buildSampleFlowerOrders(): FlowerOrder[] {
  const createdBy = { created_by_id: 'user-admin', created_by_name: 'Shop Admin' };

  return [
    sampleOrder({
      id: 'PP-2401',
      branch_id: SINGLE_BRANCH_ID,
      branch_name: SINGLE_BRANCH_NAME,
      receiver: 'Maria Santos',
      customer_social: 'maria.santos',
      scheduled_for: manilaIso(0, 9, 20),
      status: 'completed',
      claim_mode: 'walk_in',
      wrapper_color: 'Blush',
      greeting_card: 'Happy birthday, Mama',
      special_instructions: 'Loose garden style, no baby’s breath in the center.',
      downpayment: 1280,
      payment_mode: 'cash',
      payment_reference: '',
      total_amount: 1280,
      balance: 0,
      balance_paid: true,
      balance_payment_mode: '',
      balance_payment_reference: '',
      notes: 'Walk-in birthday bouquet.',
      photo_inspo_data_url: '',
      proof_dp_data_url: '',
      proof_balance_data_url: '',
      order_form_ss_data_url: '',
      ready_photo_data_url: '',
      created_at: manilaIso(0, 9, 5),
      ...createdBy,
      inventory_deducted: true,
      content_edited_at: null,
      items: [
        { product_id: 'stem-rose-red', item_name: 'Local Rose · Red', quantity: 12 },
        { product_id: 'stem-babys-breath', item_name: "Baby's Breath", quantity: 6 },
        { product_id: 'misc-kraft', item_name: 'Kraft paper wrap', quantity: 1 },
        { product_id: 'misc-card', item_name: 'Greeting card', quantity: 1 },
      ],
    }),
    sampleOrder({
      id: 'PP-2402',
      branch_id: SINGLE_BRANCH_ID,
      branch_name: SINGLE_BRANCH_NAME,
      receiver: 'Ana Cruz',
      customer_social: 'ana.cruz',
      scheduled_for: manilaIso(0, 14, 0),
      status: 'picked_up',
      claim_mode: 'pickup',
      wrapper_color: 'Mustard',
      greeting_card: '',
      special_instructions: 'Add extra sunflowers if the bunch looks thin.',
      downpayment: 400,
      payment_mode: 'gcash',
      payment_reference: 'GC-184220',
      total_amount: 860,
      balance: 0,
      balance_paid: true,
      balance_payment_mode: 'cash',
      balance_payment_reference: '',
      notes: 'Pickup after lunch.',
      photo_inspo_data_url: '',
      proof_dp_data_url: '',
      proof_balance_data_url: '',
      order_form_ss_data_url: '',
      ready_photo_data_url: '',
      created_at: manilaIso(-1, 18, 10),
      ...createdBy,
      inventory_deducted: true,
      content_edited_at: null,
      items: [
        { product_id: 'stem-sunflower', item_name: 'Sunflower', quantity: 7 },
        { product_id: 'stem-eucalyptus', item_name: 'Eucalyptus', quantity: 4 },
        { product_id: 'misc-korean', item_name: 'Korean wrapping paper', quantity: 1 },
      ],
    }),
    sampleOrder({
      id: 'PP-2403',
      branch_id: SINGLE_BRANCH_ID,
      branch_name: SINGLE_BRANCH_NAME,
      receiver: 'Jose Ramos',
      customer_social: 'jose.ramos',
      scheduled_for: manilaIso(0, 17, 30),
      status: 'ready',
      claim_mode: 'delivery',
      wrapper_color: 'White',
      greeting_card: 'Get well soon',
      special_instructions: 'Deliver to Dagupan Doctors Villa, 2nd floor nurses’ station.',
      downpayment: 700,
      payment_mode: 'metrobank',
      payment_reference: 'MB-99211',
      total_amount: 1650,
      balance: 950,
      balance_paid: false,
      balance_payment_mode: '',
      balance_payment_reference: '',
      notes: 'Balance collected on delivery.',
      photo_inspo_data_url: '',
      proof_dp_data_url: '',
      proof_balance_data_url: '',
      order_form_ss_data_url: '',
      ready_photo_data_url: '',
      created_at: manilaIso(-1, 11, 40),
      ...createdBy,
      inventory_deducted: false,
      content_edited_at: null,
      items: [
        { product_id: 'stem-tulip', item_name: 'Tulip', quantity: 10 },
        { product_id: 'stem-lily', item_name: 'Lily', quantity: 3 },
        { product_id: 'misc-ribbon', item_name: 'Satin ribbon', quantity: 1 },
      ],
    }),
    sampleOrder({
      id: 'PP-2404',
      branch_id: SINGLE_BRANCH_ID,
      branch_name: SINGLE_BRANCH_NAME,
      receiver: 'Elena Bautista',
      customer_social: 'elena.bautista',
      scheduled_for: manilaIso(1, 11, 0),
      status: 'not_started',
      claim_mode: 'pickup',
      wrapper_color: 'Dusty blue',
      greeting_card: 'Congratulations on the new shop',
      special_instructions: 'Keep the hydrangea heads cool until pickup.',
      downpayment: 1000,
      payment_mode: 'bpi',
      payment_reference: 'BPI-44190',
      total_amount: 2450,
      balance: 1450,
      balance_paid: false,
      balance_payment_mode: '',
      balance_payment_reference: '',
      notes: 'Anniversary pickup tomorrow morning.',
      photo_inspo_data_url: '',
      proof_dp_data_url: '',
      proof_balance_data_url: '',
      order_form_ss_data_url: '',
      ready_photo_data_url: '',
      created_at: manilaIso(0, 8, 15),
      ...createdBy,
      inventory_deducted: false,
      content_edited_at: null,
      items: [
        { product_id: 'stem-hydrangea', item_name: 'Hydrangea', quantity: 5 },
        { product_id: 'stem-rose-pink', item_name: 'Local Rose · Pink', quantity: 8 },
        { product_id: 'stem-eucalyptus', item_name: 'Eucalyptus', quantity: 5 },
        { product_id: 'misc-vase', item_name: 'Glass bud vase', quantity: 1 },
      ],
    }),
    sampleOrder({
      id: 'PP-2398',
      branch_id: SINGLE_BRANCH_ID,
      branch_name: SINGLE_BRANCH_NAME,
      receiver: 'Liza Gomez',
      customer_social: 'liza.gomez',
      scheduled_for: manilaIso(-1, 15, 0),
      status: 'delivered',
      claim_mode: 'delivery',
      wrapper_color: 'Ivory',
      greeting_card: 'With love',
      special_instructions: 'Leave with the guard if no one answers.',
      downpayment: 1680,
      payment_mode: 'cash',
      payment_reference: '',
      total_amount: 1680,
      balance: 0,
      balance_paid: true,
      balance_payment_mode: '',
      balance_payment_reference: '',
      notes: 'Delivered yesterday afternoon.',
      photo_inspo_data_url: '',
      proof_dp_data_url: '',
      proof_balance_data_url: '',
      order_form_ss_data_url: '',
      ready_photo_data_url: '',
      created_at: manilaIso(-2, 9, 0),
      ...createdBy,
      inventory_deducted: true,
      content_edited_at: null,
      items: [
        { product_id: 'stem-lily', item_name: 'Lily', quantity: 7 },
        { product_id: 'stem-carnation', item_name: 'Carnation', quantity: 10 },
        { product_id: 'misc-card', item_name: 'Greeting card', quantity: 1 },
      ],
    }),
    sampleOrder({
      id: 'PP-2394',
      branch_id: SINGLE_BRANCH_ID,
      branch_name: SINGLE_BRANCH_NAME,
      receiver: 'Carlo Dela Cruz',
      customer_social: 'carlo.dc',
      scheduled_for: manilaIso(-2, 13, 10),
      status: 'completed',
      claim_mode: 'walk_in',
      wrapper_color: 'Orange',
      greeting_card: '',
      special_instructions: '',
      downpayment: 920,
      payment_mode: 'gcash',
      payment_reference: 'GC-177004',
      total_amount: 920,
      balance: 0,
      balance_paid: true,
      balance_payment_mode: '',
      balance_payment_reference: '',
      notes: '',
      photo_inspo_data_url: '',
      proof_dp_data_url: '',
      proof_balance_data_url: '',
      order_form_ss_data_url: '',
      ready_photo_data_url: '',
      created_at: manilaIso(-2, 13, 2),
      ...createdBy,
      inventory_deducted: true,
      content_edited_at: null,
      items: [
        { product_id: 'stem-gerbera', item_name: 'Gerbera', quantity: 12 },
        { product_id: 'misc-kraft', item_name: 'Kraft paper wrap', quantity: 1 },
        { product_id: 'misc-teddy', item_name: 'Mini teddy', quantity: 1 },
      ],
    }),
    sampleOrder({
      id: 'PP-2388',
      branch_id: SINGLE_BRANCH_ID,
      branch_name: SINGLE_BRANCH_NAME,
      receiver: 'Wedding — Reyes',
      customer_social: 'reyes.events',
      scheduled_for: manilaIso(-6, 8, 30),
      status: 'picked_up',
      claim_mode: 'pickup',
      wrapper_color: 'White',
      greeting_card: '',
      special_instructions: 'Six matching table pieces. Keep stem length even.',
      downpayment: 4500,
      payment_mode: 'bpi',
      payment_reference: 'BPI-33810',
      total_amount: 4500,
      balance: 0,
      balance_paid: true,
      balance_payment_mode: '',
      balance_payment_reference: '',
      notes: 'Table flowers for a small reception.',
      photo_inspo_data_url: '',
      proof_dp_data_url: '',
      proof_balance_data_url: '',
      order_form_ss_data_url: '',
      ready_photo_data_url: '',
      created_at: manilaIso(-8, 16, 0),
      ...createdBy,
      inventory_deducted: true,
      content_edited_at: null,
      items: [
        { product_id: 'stem-rose-white', item_name: 'Local Rose · White', quantity: 24 },
        { product_id: 'stem-babys-breath', item_name: "Baby's Breath", quantity: 18 },
        { product_id: 'stem-eucalyptus', item_name: 'Eucalyptus', quantity: 12 },
      ],
    }),
    sampleOrder({
      id: 'PP-2405',
      branch_id: SINGLE_BRANCH_ID,
      branch_name: SINGLE_BRANCH_NAME,
      receiver: 'Nica Flores',
      customer_social: 'nica.flores',
      scheduled_for: manilaIso(3, 16, 0),
      status: 'not_started',
      claim_mode: 'pickup',
      wrapper_color: 'Sage',
      greeting_card: 'Thank you',
      special_instructions: 'Customer will send a reference photo later.',
      downpayment: 500,
      payment_mode: 'gcash',
      payment_reference: 'GC-190331',
      total_amount: 1100,
      balance: 600,
      balance_paid: false,
      balance_payment_mode: '',
      balance_payment_reference: '',
      notes: 'Advance order for Friday.',
      photo_inspo_data_url: '',
      proof_dp_data_url: '',
      proof_balance_data_url: '',
      order_form_ss_data_url: '',
      ready_photo_data_url: '',
      created_at: manilaIso(0, 10, 45),
      ...createdBy,
      inventory_deducted: false,
      content_edited_at: null,
      items: [
        { product_id: 'stem-chrysanthemum', item_name: 'Chrysanthemum', quantity: 10 },
        { product_id: 'stem-carnation', item_name: 'Carnation', quantity: 8 },
        { product_id: 'misc-ribbon', item_name: 'Satin ribbon', quantity: 1 },
      ],
    }),
  ];
}

/** @deprecated use buildSampleFlowerOrders */
export const FLOWER_ORDERS_SEED: FlowerOrder[] = [];

export function buildSampleInventoryMovements(): FlowerInventoryMovementRow[] {
  return [
    {
      id: 4,
      branch_id: SINGLE_BRANCH_ID,
      branch_name: SINGLE_BRANCH_NAME,
      product_id: 'stem-rose-red',
      product_name: 'Local Rose',
      movement_type: 'order_deduct',
      quantity: 12,
      previous_on_hand: 98,
      new_on_hand: 86,
      note: 'Order PP-2401 · Maria Santos · day-close deduct',
      created_at: manilaIso(0, 9, 25),
      created_by_id: 'user-admin',
      created_by_name: 'Shop Admin',
    },
    {
      id: 3,
      branch_id: SINGLE_BRANCH_ID,
      branch_name: SINGLE_BRANCH_NAME,
      product_id: 'stem-rose-red',
      product_name: 'Local Rose',
      movement_type: 'stock_in',
      quantity: 40,
      previous_on_hand: 58,
      new_on_hand: 98,
      note: 'Morning delivery from the Dagupan grower',
      created_at: manilaIso(0, 7, 35),
      created_by_id: 'user-admin',
      created_by_name: 'Shop Admin',
    },
    {
      id: 2,
      branch_id: SINGLE_BRANCH_ID,
      branch_name: SINGLE_BRANCH_NAME,
      product_id: 'stem-lily',
      product_name: 'Lily',
      movement_type: 'stock_in',
      quantity: 15,
      previous_on_hand: 14,
      new_on_hand: 29,
      note: 'Restock before the weekend rush',
      created_at: manilaIso(-1, 8, 10),
      created_by_id: 'user-admin',
      created_by_name: 'Shop Admin',
    },
    {
      id: 1,
      branch_id: SINGLE_BRANCH_ID,
      branch_name: SINGLE_BRANCH_NAME,
      product_id: 'misc-vase',
      product_name: 'Glass bud vase',
      movement_type: 'stock_out',
      quantity: 2,
      previous_on_hand: 13,
      new_on_hand: 11,
      note: 'Two chipped vases pulled from the shelf',
      created_at: manilaIso(-1, 17, 5),
      created_by_id: 'user-admin',
      created_by_name: 'Shop Admin',
    },
  ];
}

export function buildSampleSupplierCosts(): FlowerSupplierCost[] {
  return [
    {
      id: 'sup-roses',
      branch_id: SINGLE_BRANCH_ID,
      branch_name: SINGLE_BRANCH_NAME,
      product_id: 'stem-rose-red',
      product_name: 'Local Rose',
      amount: 1800,
      description: 'Morning rose bundle from the Dagupan grower',
      cost_date: manilaDateKey(0),
      created_by_id: 'user-admin',
      created_by_name: 'Shop Admin',
      created_at: manilaIso(0, 7, 50),
    },
    {
      id: 'sup-greens',
      branch_id: SINGLE_BRANCH_ID,
      branch_name: SINGLE_BRANCH_NAME,
      product_id: 'stem-eucalyptus',
      product_name: 'Eucalyptus',
      amount: 640,
      description: 'Eucalyptus and filler greens',
      cost_date: manilaDateKey(-1),
      created_by_id: 'user-admin',
      created_by_name: 'Shop Admin',
      created_at: manilaIso(-1, 8, 20),
    },
  ];
}

export function buildSampleStaffExpenses(): FlowerStaffExpense[] {
  return [
    {
      id: 'exp-fuel',
      staff_id: 'user-admin',
      staff_name: 'Shop Admin',
      branch_id: SINGLE_BRANCH_ID,
      branch_name: SINGLE_BRANCH_NAME,
      amount: 180,
      description: 'Delivery fuel — Villa and Bonuan runs',
      expense_date: manilaDateKey(0),
      payment_mode: 'cash',
      created_at: manilaIso(0, 12, 10),
    },
    {
      id: 'exp-ice',
      staff_id: 'user-admin',
      staff_name: 'Shop Admin',
      branch_id: SINGLE_BRANCH_ID,
      branch_name: SINGLE_BRANCH_NAME,
      amount: 95,
      description: 'Ice and buckets for the cooler',
      expense_date: manilaDateKey(-1),
      payment_mode: 'gcash',
      created_at: manilaIso(-1, 7, 15),
    },
  ];
}

/** @deprecated use FLOWER_STEMS_MOCK */
export type FlowerPosCatalogItem = FlowerStemCatalogItem & {
  category?: string;
  description?: string;
  image?: string;
  base_price?: number;
};

/** @deprecated use FLOWER_STEMS_MOCK */
export const FLOWER_PRODUCTS_CATALOG_MOCK = FLOWER_STEMS_MOCK.map((stem) => ({
  ...stem,
  base_price: stem.unit_cost,
  category: stem.product_kind === 'misc' ? 'Shop supplies' : 'Stems',
  description: '',
  image: '',
}));
