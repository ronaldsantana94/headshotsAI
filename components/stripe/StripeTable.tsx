'use client'
import { User } from '@supabase/supabase-js';
import React, { useEffect } from 'react';

interface StripePricingTableProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  'pricing-table-id': string;
  'publishable-key': string;
  'client-reference-id'?: string;
  'customer-email'?: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-pricing-table': StripePricingTableProps;
    }
  }
}

type Props = {
  user: User;
}

const StripePricingTable = ({ user }: Props) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://js.stripe.com/v3/pricing-table.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, []);

  return (
    <div className='flex flex-1 flex-col w-full'>
      <stripe-pricing-table
        pricing-table-id="prctbl_1R5PBOGfJFi3Al3WWze5nS6K"
        publishable-key="pk_test_51R3w1dGfJFi3Al3WaEi3HQo6JPFUlbv2Zz8IPi3mRNBJsPwbPIMSrCgBnh3l24sue0YfuRBgURXBUnFBzHMY3wKj002l3xPJPK"
        client-reference-id={user.id}
        customer-email={user.email || undefined}
        success-url={`${process.env.NEXT_PUBLIC_VERCEL_URL}/get-credits?success=true`}
      />
    </div>
  );
}

export default StripePricingTable;