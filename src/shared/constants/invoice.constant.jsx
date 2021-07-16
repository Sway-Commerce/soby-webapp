import { ReactComponent as ClockIcon } from 'shared/assets/clock.svg';
import { ReactComponent as TickIcon } from 'shared/assets/tick-icon.svg';
import { ReactComponent as DollasIcon } from 'shared/assets/dollas-icon.svg';
import { ReactComponent as TruckIcon } from 'shared/assets/truck-icon.svg';

export const mainInvoiceFilters = ['Orders', 'Invoices'];
export const subInvoiceFilters = [
  'ALL',
  'READY TO PAY',
  'DEPOSIT',
  'DELIVERING',
  'DELIVERED',
  'COMPLETED'
];

export const InvoiceStatusValue = [
  'ACCEPTED',
  'PAID',
  'CONFIRMED',
  'SHIPPING',
  'DELIVERED',
  'COMPLETED',
  'CANCELLED',
];

export const subInvoiceIcons = [
  <ClockIcon />,
  <DollasIcon />,
  <TruckIcon />,
  <TruckIcon />,
  <TickIcon />,
  <TickIcon />,
];
