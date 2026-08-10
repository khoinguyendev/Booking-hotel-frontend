"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

function Pagination({
  className,
  ...props
}: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  )
}

function PaginationItem(props: React.ComponentProps<"li">) {
  return <li {...props} />
}

function PaginationLink({
  isActive,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  isActive?: boolean
}) {
  return (
    <button
      className={cn(
        buttonVariants({
          variant: isActive ? "default" : "outline",
          size: "icon",
        }),
        className
      )}
      {...props}
    />
  )
}

function PaginationPrevious(props: React.ComponentProps<"button">) {
  return (
    <Button variant="outline" size="icon" {...props}>
      <ChevronLeft className="h-4 w-4" />
    </Button>
  )
}

function PaginationNext(props: React.ComponentProps<"button">) {
  return (
    <Button variant="outline" size="icon" {...props}>
      <ChevronRight className="h-4 w-4" />
    </Button>
  )
}

function PaginationEllipsis() {
  return (
    <span className="flex h-9 w-9 items-center justify-center">
      <MoreHorizontal className="h-4 w-4" />
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}