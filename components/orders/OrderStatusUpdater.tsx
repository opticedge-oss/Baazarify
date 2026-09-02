'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface OrderStatusUpdaterProps {
  orderId: string;
  currentStatus: string;
}

export default function OrderStatusUpdater({
  orderId,
  currentStatus,
}: OrderStatusUpdaterProps) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleStatusChange = async (newStatus: string) => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`/api/dashboard/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update status');

      setStatus(newStatus);
      setMessage('Status updated successfully');
      router.refresh();

      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  const statuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

  return (
    <div className="space-y-3">
      <select
        value={status}
        onChange={(e) => handleStatusChange(e.target.value)}
        disabled={loading}
        className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:outline-none focus:border-emerald-500 capitalize disabled:opacity-50"
      >
        {statuses.map((s) => (
          <option key={s} value={s} className="bg-zinc-900 capitalize">
            {s}
          </option>
        ))}
      </select>
      {message && (
        <p className={`text-sm ${
          message.includes('successfully')
            ? 'text-emerald-400'
            : 'text-red-400'
        }`}>
          {message}
        </p>
      )}
    </div>
  );
}
