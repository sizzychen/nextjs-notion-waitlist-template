"use client";

import { toast } from "sonner";
import { useState } from "react";
import CTA from "@/components/cta";
import Form from "@/components/form";
import Logos from "@/components/logos";
import Particles from "@/components/ui/particles";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Home() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [profession, setProfession] = useState<string>("");
  const [referralSource, setReferralSource] = useState<string>("");
  const [otherReferralSource, setOtherReferralSource] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleProfessionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProfession(event.target.value);
  };

  const handleReferralSourceChange = (value: string) => {
    setReferralSource(value);
    if (value !== "Other") {
      setOtherReferralSource("");
    }
  };

  const handleOtherReferralSourceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOtherReferralSource(event.target.value);
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    if (!name || !email || !referralSource) {
      toast.error("Please fill in all required fields 😠");
      return;
    }

    if (referralSource === "Other" && !otherReferralSource) {
      toast.error("Please specify how you heard about us 😠");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address 😠");
      return;
    }

    setLoading(true);

    const promise = new Promise(async (resolve, reject) => {
      try {
        // First, attempt to send the email
        // Commented out email sending for development
        /*
        const mailResponse = await fetch("/api/mail", {
          cache: "no-store",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ firstname: name, email }),
        });

        if (!mailResponse.ok) {
          if (mailResponse.status === 429) {
            reject("Rate limited");
          } else {
            reject("Email sending failed");
          }
          return; // Exit the promise early if mail sending fails
        }
        */

        // Prepare referral source value
        const finalReferralSource = referralSource === "Other" 
          ? otherReferralSource 
          : referralSource;

        // Proceed directly to insert into Notion
        const notionResponse = await fetch("/api/notion", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            name, 
            email,
            profession,
            referralSource: finalReferralSource
          }),
        });

        if (!notionResponse.ok) {
          if (notionResponse.status === 429) {
            reject("Rate limited");
          } else {
            reject("Notion insertion failed");
          }
        } else {
          resolve({ name });
        }
      } catch (error) {
        reject(error);
      }
    });

    toast.promise(promise, {
      loading: "Getting you on the waitlist... 🚀",
      success: (data) => {
        setName("");
        setEmail("");
        setProfession("");
        setReferralSource("");
        setOtherReferralSource("");
        return "Thank you for joining the waitlist 🎉";
      },
      error: (error) => {
        if (error === "Rate limited") {
          return "You're doing that too much. Please try again later";
        // Removed email sending failure reference
        } else if (error === "Notion insertion failed") {
          return "Failed to save your details. Please try again 😢.";
        }
        return "An error occurred. Please try again 😢.";
      },
    });

    promise.finally(() => {
      setLoading(false);
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center overflow-x-clip pt-12 md:pt-24">
      <section className="flex flex-col items-center px-4 sm:px-6 lg:px-8">
        <Header />

        <CTA />

        <Form
          name={name}
          email={email}
          profession={profession}
          referralSource={referralSource}
          otherReferralSource={otherReferralSource}
          handleNameChange={handleNameChange}
          handleEmailChange={handleEmailChange}
          handleProfessionChange={handleProfessionChange}
          handleReferralSourceChange={handleReferralSourceChange}
          handleOtherReferralSourceChange={handleOtherReferralSourceChange}
          handleSubmit={handleSubmit}
          loading={loading}
        />

        <Logos />
      </section>

      <Footer />

      <Particles
        quantityDesktop={350}
        quantityMobile={100}
        ease={80}
        color={"#F7FF9B"}
        refresh
      />
    </main>
  );
}