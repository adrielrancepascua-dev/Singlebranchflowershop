import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, CalendarDays, Package, Sprout } from 'lucide-react';
import { listFlowerOrders } from '../../../../services/flowers/orders';
import { listFlowerInventoryStock } from '../../../../services/flowers/inventory';
import { useFlowerAuth } from '../../../../lib/auth/FlowerAuthContext';
import { formatFlowerRoleLabel } from '../../shared/types/auth';
import { FLOWER_ORDER_TERMINAL_STATUSES } from '../../shared/types/flower-order';
import { SINGLE_BRANCH_NAME } from '../../shared/data/flowers.mock';
import FlowerPageHeader from '../../shared/components/FlowerPageHeader';
import FlowerStatCard from '../../shared/components/FlowerStatCard';
import {
  PRICE_FORMATTER,
  scheduledForToDateKey,
  toManilaDateKeyFromDate,
} from '../../shared/utils/flower-format';
import { isFlowerReportSalesIncluded } from '../../shared/utils/flower-report-financials';

const SECTIONS = [
  {
    label: 'Orders',
    to: '/dashboard/flowers/orders',
    icon: CalendarDays,
    description: 'Pickups, deliveries, and walk-ins on a calendar or a list.',
  },
  {
    label: 'Inventory',
    to: '/dashboard/flowers/inventory',
    icon: Package,
    description: 'Stems, wrappers, and gift items on the shelf. Stock in or out from here.',
  },
  {
    label: 'Products',
    to: '/dashboard/flowers/products',
    icon: Sprout,
    description: 'Flower types, colors, and shop extras with their unit cost.',
  },
  {
    label: 'Reports',
    to: '/dashboard/flowers/reports',
    icon: BarChart3,
    description: 'Sales, supplier costs, and a printable report for the shop.',
  },
];

export default function FlowersAdminHome() {
  const { user } = useFlowerAuth();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [todaySales, setTodaySales] = useState(0);
  const [todayOrders, setTodayOrders] = useState(0);
  const [openOrders, setOpenOrders] = useState(0);
  const [lowStock, setLowStock] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setErrorMessage('');
      try {
        const today = toManilaDateKeyFromDate();
        const [orders, stock] = await Promise.all([
          listFlowerOrders(),
          listFlowerInventoryStock(),
        ]);

        if (cancelled) {
          return;
        }

        const todays = orders.filter((order) => scheduledForToDateKey(order.scheduled_for) === today);
        const sold = todays.filter((order) => isFlowerReportSalesIncluded(order.status));
        setTodayOrders(todays.length);
        setTodaySales(sold.reduce((sum, order) => sum + order.total_amount, 0));
        setOpenOrders(
          orders.filter(
            (order) =>
              order.status !== 'cancelled' && !FLOWER_ORDER_TERMINAL_STATUSES.includes(order.status),
          ).length,
        );
        setLowStock(
          stock.filter((row) => row.product_is_active && row.product_kind === 'flower' && row.on_hand <= 20)
            .length,
        );
      } catch (error) {
        if (!cancelled) {
          setErrorMessage(error instanceof Error ? error.message : 'Could not load the shop summary.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="animate-fade-in">
      <FlowerPageHeader
        label="Papers & Petals"
        title={`${SINGLE_BRANCH_NAME} shop`}
        description={`Signed in as ${user?.display_name ?? 'Shop Admin'}, ${formatFlowerRoleLabel(user?.role ?? 'admin')}. One counter, one cooler, one set of books.`}
      />

      {errorMessage ? (
        <p className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {errorMessage}
        </p>
      ) : null}

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <FlowerStatCard
          label="Today’s sales"
          value={loading ? '…' : PRICE_FORMATTER.format(todaySales)}
          icon={BarChart3}
          accent="green"
        />
        <FlowerStatCard label="Orders today" value={loading ? '…' : todayOrders} icon={CalendarDays} />
        <FlowerStatCard
          label="Still open"
          value={loading ? '…' : openOrders}
          icon={Package}
          accent="warm"
        />
        <FlowerStatCard
          label="Low stems"
          value={loading ? '…' : lowStock}
          icon={Sprout}
          accent={lowStock > 0 ? 'warm' : 'green'}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {SECTIONS.map((section) => (
          <Link
            key={section.to}
            to={section.to}
            className="flower-card block p-4 transition hover:border-brand-accent"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-beige/80 text-brand-brown">
                <section.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-semibold text-brand-dark">{section.label}</h3>
                <p className="mt-1 text-sm text-brand-brown/70">{section.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
