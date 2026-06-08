"use client";

import { Edit3, Eye, Filter, Heart, ImagePlus, MoreHorizontal, PlusCircle, Trash2, Upload } from "lucide-react";
import { UImg } from "@/components/photohub/Helpers";
import { dashPortfolio } from "@/lib/photohub-data";

interface Props {
    uploadDragging: boolean;
    onDragOver: () => void;
    onDragLeave: () => void;
    onDrop: () => void;
}

const HEIGHTS = [200, 270, 220, 250, 240, 200, 260, 220, 240];

export function PortfolioTab({ uploadDragging, onDragOver, onDragLeave, onDrop }: Props) {
    return (
        <div className="space-y-5">
            {/* Upload area */}
            <div
                onDragOver={(e) => { e.preventDefault(); onDragOver(); }}
                onDragLeave={onDragLeave}
                onDrop={(e) => { e.preventDefault(); onDrop(); }}
                className={`border-2 border-dashed rounded-2xl py-10 flex flex-col items-center gap-3 cursor-pointer transition-all ${
                    uploadDragging
                        ? "border-primary bg-primary/8"
                        : "border-border hover:border-primary/40 hover:bg-primary/4"
                }`}
            >
                <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={
                        uploadDragging
                            ? { background: "linear-gradient(135deg, var(--primary), var(--accent))" }
                            : { background: "rgba(255,107,0,0.12)", border: "1px solid rgba(255,107,0,0.25)" }
                    }
                >
                    <Upload size={22} className="text-primary" />
                </div>
                <div className="text-center">
                    <p className="font-semibold text-white text-sm">
                        {uploadDragging ? "Drop to upload" : "Drag & drop your photos"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                        PNG, JPG, RAW up to 50MB each · or{" "}
                        <span className="text-primary cursor-pointer">browse files</span>
                    </p>
                </div>
                <button
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center gap-2"
                    style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))" }}
                >
                    <ImagePlus size={14} /> Choose Files
                </button>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-white">
                    Your Photos{" "}
                    <span className="text-muted-foreground font-normal text-sm">({dashPortfolio.length})</span>
                </h3>
                <div className="flex gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-border text-xs text-white/50 hover:text-white transition-all">
                        <Filter size={12} /> Filter
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-border text-xs text-white/50 hover:text-white transition-all">
                        <MoreHorizontal size={12} /> Sort
                    </button>
                </div>
            </div>

            {/* Masonry grid */}
            <div className="columns-2 md:columns-3 [column-gap:0.75rem]">
                {dashPortfolio.map((photo, i) => (
                    <div
                        key={photo.id}
                        className="group relative rounded-xl overflow-hidden mb-3 break-inside-avoid cursor-pointer"
                        style={{ height: HEIGHTS[i % HEIGHTS.length] }}
                    >
                        <UImg
                            name={photo.img}
                            alt={photo.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-between p-3">
                            <div className="flex justify-end gap-1.5">
                                <button className="w-7 h-7 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center text-white border border-white/15 hover:bg-white/25 transition-all">
                                    <Edit3 size={12} />
                                </button>
                                <button className="w-7 h-7 rounded-lg bg-destructive/30 backdrop-blur-sm flex items-center justify-center text-destructive border border-destructive/40 hover:bg-destructive/50 transition-all">
                                    <Trash2 size={12} />
                                </button>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-white">{photo.title}</p>
                                <div className="flex items-center gap-2 mt-1">
                  <span className="flex items-center gap-1 text-[10px] text-white/50">
                    <Eye size={9} />{photo.views.toLocaleString()}
                  </span>
                                    <span className="flex items-center gap-1 text-[10px] text-white/50">
                    <Heart size={9} />{photo.likes}
                  </span>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/10 text-white/60">{photo.cat}</span>
                                </div>
                            </div>
                        </div>
                        <span className="absolute top-2 left-2 text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-black/60 text-white/60 backdrop-blur-sm border border-white/10">
              {photo.cat}
            </span>
                    </div>
                ))}

                {/* Add more */}
                <div
                    className="rounded-xl border-2 border-dashed border-border hover:border-primary/30 hover:bg-primary/4 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer mb-3 break-inside-avoid"
                    style={{ height: 180 }}
                >
                    <PlusCircle size={24} className="text-white/20" />
                    <p className="text-xs text-muted-foreground">Add photos</p>
                </div>
            </div>
        </div>
    );
}