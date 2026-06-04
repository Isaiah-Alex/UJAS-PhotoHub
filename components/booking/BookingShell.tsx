"use client";

import { ChevronLeft } from "lucide-react";
import { useBooking } from "@/hooks/useBooking";
import { photographers } from "@/lib/photohub-data";
import { BookingStepper } from "./BookingStepper";
import { BookingSidebar } from "./BookingSidebar";
import { BookingConfirmed } from "./BookingConfirmed";
import { SessionStep } from "./steps/SessionStep";
import { DateTimeStep } from "./steps/DateTimeStep";
import { DetailsStep } from "./steps/DetailsStep";
import { PaymentStep } from "./steps/PaymentStep";

interface Props {
    onGoHome: () => void;
    onViewProfile: () => void;
}

export function BookingShell({ onGoHome, onViewProfile }: Props) {
    const booking = useBooking();
    const photographer = photographers[0];

    // Success screen — full-page takeover, no shell chrome needed
    if (booking.done) {
        return (
            <BookingConfirmed
                photographer={photographer}
                selectedSession={booking.selectedSession}
                addOns={booking.addOns}
                calMonth={booking.calMonth}
                calYear={booking.calYear}
                selectedDay={booking.selectedDay}
                selectedSlot={booking.selectedSlot}
                onGoHome={onGoHome}
                onViewProfile={onViewProfile}
            />
        );
    }

    return (
        <div className="min-h-screen bg-background pt-20 pb-16">
            {/* Ambient glows */}
            <div
                className="fixed top-0 right-0 w-[500px] h-[500px] rounded-full blur-[180px] opacity-[0.06] pointer-events-none"
                style={{ background: "var(--primary)" }}
            />

            <div
                className="fixed bottom-0 left-0 w-96 h-96 rounded-full blur-[140px] opacity-[0.05] pointer-events-none"
                style={{ background: "var(--chart-5)" }}
            />

            <div className="max-w-6xl mx-auto px-4">
                {/* Back button + header */}
                <div className="flex items-center gap-3 mb-8 pt-4">
                    <button
                        onClick={booking.step > 1 ? booking.goBack : onViewProfile}
                        className="w-9 h-9 rounded-xl bg-foreground/5 border border-foreground/10 flex items-center justify-center text-secondary-foreground hover:text-foreground hover:bg-foreground/10 transition-all"
                    >
                        <ChevronLeft size={16} />
                    </button>

                    <div>
                        <h1 className="font-display text-2xl font-bold text-foreground tracking-tight">
                            Book a Session
                        </h1>

                        <p className="text-xs text-muted-foreground mt-0.5">
                            with {photographer.name} · {photographer.specialty}
                        </p>
                    </div>
                </div>

                {/* Step indicator */}
                <BookingStepper currentStep={booking.step} />

                {/* Main layout */}
                <div className="grid lg:grid-cols-[1fr_360px] gap-6 items-start">
                    {/* Step content */}
                    <div>
                        {booking.step === 1 && (
                            <SessionStep
                                selectedSession={booking.selectedSession}
                                addOns={booking.addOns}
                                onSelectSession={booking.setSelectedSession}
                                onToggleAddOn={booking.toggleAddOn}
                                onNext={booking.goNext}
                            />
                        )}

                        {booking.step === 2 && (
                            <DateTimeStep
                                calYear={booking.calYear}
                                calMonth={booking.calMonth}
                                selectedDay={booking.selectedDay}
                                selectedSlot={booking.selectedSlot}
                                onPrevMonth={booking.prevMonth}
                                onNextMonth={booking.nextMonth}
                                onSelectDay={booking.pickDay}
                                onSelectSlot={booking.setSelectedSlot}
                                onNext={booking.goNext}
                            />
                        )}

                        {booking.step === 3 && (
                            <DetailsStep
                                selectedLocation={booking.selectedLocation}
                                onSelectLocation={booking.setSelectedLocation}
                                address={booking.address}
                                onAddressChange={booking.setAddress}
                                subjectCount={booking.subjectCount}
                                onSubjectCount={booking.setSubjectCount}
                                customSubjects={booking.customSubjects}
                                onCustomSubjects={booking.setCustomSubjects}
                                note={booking.note}
                                onNoteChange={booking.setNote}
                                clientName={booking.clientName}
                                onClientName={booking.setClientName}
                                clientPhone={booking.clientPhone}
                                onClientPhone={booking.setClientPhone}
                                onNext={booking.goNext}
                            />
                        )}

                        {booking.step === 4 && (
                            <PaymentStep
                                selectedSession={booking.selectedSession}
                                addOns={booking.addOns}
                                payMethod={booking.payMethod}
                                cardNum={booking.cardNum}
                                cardExp={booking.cardExp}
                                cardCvv={booking.cardCvv}
                                cardName={booking.cardName}
                                loading={booking.loading}
                                onPayMethodChange={booking.setPayMethod}
                                onCardNumChange={booking.setCardNum}
                                onCardExpChange={booking.setCardExp}
                                onCardCvvChange={booking.setCardCvv}
                                onCardNameChange={booking.setCardName}
                                onSubmit={booking.handleConfirm}
                            />
                        )}
                    </div>

                    {/* Sidebar — always visible */}
                    <BookingSidebar
                        photographer={photographer}
                        selectedSession={booking.selectedSession}
                        addOns={booking.addOns}
                        calMonth={booking.calMonth}
                        calYear={booking.calYear}
                        selectedDay={booking.selectedDay}
                        selectedSlot={booking.selectedSlot}
                    />
                </div>
            </div>
        </div>
    );
}