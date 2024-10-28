"use client";

import { BASE_URL } from "@/api/Api";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/types";
import { formatReleaseDate } from "@/utils/dateFn";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import EditBtn from "../EditBtn";
import DeleteBtn from "./DeleteBtn";

const handleDelete = async (id: string, token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/coupons/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete coupon");
    }

    console.log("Coupon deleted successfully");
  } catch (error) {
    console.error("Error deleting coupon:", error);
  }
};

export const columns: ColumnDef<categories>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="mx-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span className="font-mono">{row.index + 1}</span>;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="mx-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "discount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Discount
          <ArrowUpDown className="mx-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "expire",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Expire
          <ArrowUpDown className="mx-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span>{formatReleaseDate(row.getValue("expire"))}</span>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="mx-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div>{formatReleaseDate(row.getValue("createdAt"))}</div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const couponId = row.original._id;

      return (
        <div className="flex gap-2">
          <EditBtn id={couponId} name="coupons" />
          <DeleteBtn couponId={couponId} handleDelete={handleDelete} />
        </div>
      );
    },
  },
];
