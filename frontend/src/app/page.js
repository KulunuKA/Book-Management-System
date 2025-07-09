"use client";
import styles from "./page.module.css";
import Input from "@/components/ui/Input";
import CustomButton from "@/components/ui/Button";

export default function Home() {
  return (
    <div className={styles.page}>
      <Input />
      <CustomButton onClick={() => console.log("Clicked")} name="Login" />
    </div>
  );
}
