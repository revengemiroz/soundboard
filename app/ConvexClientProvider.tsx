"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";
import { useAudioStore } from "./zustand/store";
import { ScrollArea } from "@/components/ui/scroll-area";

import SheetComponent from "../app/components/SheetComponent";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  // Zustand store functions & state
  const { setSheetOpen, sheetOpen, soundboard } = useAudioStore();

  return (
    <ConvexProvider client={convex}>
      {children}

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="flex">
          <SheetHeader>
            <SheetTitle>My Soundboard</SheetTitle>
            <SheetDescription>
              This is a list of your custom soundboard list.
            </SheetDescription>
          </SheetHeader>

          <ScrollArea className="flex-1 mx-4 rounded-md max-h-[85dvh] bg-muted-foreground/20 p-2">
            {soundboard.length == 0 && (
              <h3 className=" text-center text-muted-foreground/90">
                You havent added an audio here yet.
              </h3>
            )}
            <SheetComponent />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </ConvexProvider>
  );
}
