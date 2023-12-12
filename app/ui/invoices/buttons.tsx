'use client';
import Swal from 'sweetalert2';
import { deleteInvoice } from '@/app/lib/actions';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React, { FormEvent, FormEventHandler, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
// import Swal from 'sweetalert2/dist/sweetalert2.js'
// import 'sweetalert2/src/sweetalert2.scss'

export function CreateInvoice() {
  return (
    <Link
      href="/dashboard/invoices/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Invoice</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/invoices/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteInvoice({ id }: { id: string }) {
  const initalState = {
    message: null,
  };
  const form = useRef<HTMLFormElement>(null);
  // const deleteInvoiceWithId = deleteInvoice.bind(null, id);
  const [state, formAction] = useFormState(deleteInvoice, initalState);
  function confirmDelete(e: React.FormEvent<HTMLFormElement>) {
    const formData = new FormData(e.currentTarget);
    e.preventDefault();
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        formAction(formData);
        Swal.fire({
          title: 'Deleted!',
          text: `invoce success deleted`,
          icon: 'success',
        });
      }
    });
  }

  return (
    <>
      <form onSubmit={confirmDelete} ref={form}>
        <input type="hidden" name="id" value={id} />
        <button className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-4" />
        </button>
      </form>
    </>
  );
}
