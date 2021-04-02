
import { ReactComponent as ClockIcon } from 'shared/assets/clock.svg';
import { ReactComponent as TickIcon } from 'shared/assets/tick-icon.svg';
import { ReactComponent as DollasIcon } from 'shared/assets/dollas-icon.svg';
import { ReactComponent as TruckIcon } from 'shared/assets/truck-icon.svg';

export const mainInvoiceFilters = ['Orders', 'Invoices'];
export const subInvoiceFilters = [
  'Accepted',
  'Paid',
  'Shipping',
  'Delivered',
  'Completed',
  'Cancelled',
];

export const subInvoiceIcons = [
  <ClockIcon />,
  <DollasIcon />,
  <TruckIcon />,
  <TruckIcon />,
  <TickIcon />,
  <TickIcon />,
];
