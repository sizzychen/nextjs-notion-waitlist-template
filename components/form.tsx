import Link from "next/link";
import { ChangeEvent } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";
import { EnhancedButton } from "@/components/ui/enhanced-btn";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";

interface FormProps {
  name: string;
  email: string;
  profession: string;
  referralSource: string;
  otherReferralSource: string;
  handleNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleProfessionChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleReferralSourceChange: (value: string) => void;
  handleOtherReferralSourceChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  loading: boolean;
}

export default function Form({
  name,
  email,
  profession,
  referralSource,
  otherReferralSource,
  handleNameChange,
  handleEmailChange,
  handleProfessionChange,
  handleReferralSourceChange,
  handleOtherReferralSourceChange,
  handleSubmit,
  loading,
}: FormProps) {
  return (
    <motion.div
      className="mt-6 flex w-full max-w-[24rem] flex-col gap-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible">
      <motion.div variants={itemVariants}>
        <Input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={handleNameChange}
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Input
          type="email"
          placeholder="Your Email Address"
          value={email}
          onChange={handleEmailChange}
        />
      </motion.div>
      <motion.div variants={itemVariants} className="relative">
        <div className="flex items-center">
          <Input
            type="text"
            placeholder="Your Profession (Optional)"
            value={profession}
            onChange={handleProfessionChange}
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="absolute right-3 text-yellow-100/70 hover:text-yellow-100">
                  <FaInfoCircle className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="bg-zinc-800 text-yellow-100 text-xs p-2 rounded-md border border-yellow-100/30">
                Tell us about your work - this helps us tailor the experience
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </motion.div>
      <motion.div variants={itemVariants} className="relative">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute right-10 top-3 z-10 text-yellow-100/70 hover:text-yellow-100">
                <FaInfoCircle className="h-4 w-4" />
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-zinc-800 text-yellow-100 text-xs p-2 rounded-md border border-yellow-100/30">
              We'd love to know how you discovered us
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Select value={referralSource} onValueChange={handleReferralSourceChange}>
          <SelectTrigger>
            <SelectValue placeholder="How Did You Hear About Us? *" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Social Media">Social Media</SelectItem>
            <SelectItem value="Friend">Friend</SelectItem>
            <SelectItem value="Search Engine">Search Engine</SelectItem>
            <SelectItem value="Blog">Blog</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>
      {referralSource === "Other" && (
        <motion.div variants={itemVariants}>
          <Input
            type="text"
            placeholder="Please specify"
            value={otherReferralSource}
            onChange={handleOtherReferralSourceChange}
          />
        </motion.div>
      )}
      <motion.div variants={itemVariants}>
        <EnhancedButton
          variant="expandIcon"
          Icon={FaArrowRightLong}
          onClick={handleSubmit}
          iconPlacement="right"
          className="mt-2 w-full"
          disabled={loading}>
          {loading ? "Loading..." : "Join Waitlist!"}
        </EnhancedButton>
      </motion.div>
      <motion.div
        variants={itemVariants}
        className="mt-4 flex w-full items-center justify-center gap-1 text-muted-foreground">
        <p>For any queries, reach out at </p>
        <Link
          href="https://x.com/blakssh"
          rel="noopener noreferrer"
          target="_blank">
          <FaXTwitter className="h-4 w-4 transition-all duration-200 ease-linear hover:text-yellow-200" />
        </Link>
        or
        <Link
          href="https://github.com/lakshaybhushan"
          rel="noopener noreferrer"
          target="_blank">
          <FaGithub className="ml-0.5 h-5 w-5 transition-all duration-200 ease-linear hover:text-yellow-200" />
        </Link>
      </motion.div>
    </motion.div>
  );
}