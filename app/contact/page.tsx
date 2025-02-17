// @ts-nocheck
"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Contact() {
  const router = useRouter();
  const [step, setStep] = useState(1); // Step 1 is the initial screen
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isAgree, setIsAgree] = useState(false);
  const [additionalInput, setAdditionalInput] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [answers, setAnswers] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  // Extract answers from query parameters when the component mounts
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paramsObject = {};
    for (const [key, value] of params.entries()) {
      paramsObject[key] = value;
    }
    setAnswers(paramsObject); // Save the parameters to state
  }, []);

  const handlePhoneInputChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleAgreementToggle = () => {
    setIsAgree(!isAgree);
  };

  const handleNextStep = () => {
    if (!phoneNumber) {
      alert("אנא הכנס מספר טלפון לפני המשך.");
      return;
    }
    if (!isAgree) {
      alert("עליך לאשר את הסכמתך להמשיך.");
      return;
    }
    setStep(2); // Move to the second step
  };

  const handleInputChange = (event) => {
    setAdditionalInput(event.target.value);
  };

  const handleRatingSelect = (rating) => {
    setSelectedRating(rating);
  };

  const handleSubmit = async () => {
    const userInfo = {
      subject: Object.keys(answers)[0] == "extortion" ? "סחיטה" : "",
      phoneNumber: phoneNumber,
      additionalInput: additionalInput,
    };

    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      if (response.ok) {
        setShowPopup(true);
      } else {
        const error = await response.json();
        alert("Failed to send email: " + error.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting feedback.");
    }
  };

  if (step === 1) {
    return (
      <div className={styles.contactFlowContainer}>
        {/* Header Section */}
        <div className={styles.header}>
          <button
            className={styles.backButton}
            onClick={() => router.push("/wizard")}
          >
            חזרה
          </button>
          <div className={styles.progressIndicator}>
            <span className={styles.activeDot}></span>
            <span className={styles.inactiveDot}></span>
          </div>
        </div>

        {/* Graphic Section */}
        <div className={styles.graphicPlaceholder}>אייקון</div>

        {/* Content Section */}
        <div className={styles.content}>
          <p className={styles.text}>
            אני מקווה שעזרתי לך קצת ואתה מרגיש קצת יותר טוב.
            <br />
            אני מוכן להעביר את הפרטים שלך לנציג והוא ייצור איתך קשר
            <br />
            באמצעות הוואצאפ בזמן הקרוב.
          </p>
          <input
            type="tel"
            className={styles.inputBox}
            placeholder="הכנס מספר טלפון"
            value={phoneNumber}
            onChange={handlePhoneInputChange}
          />
          <div className={styles.agreementContainer}>
            <input
              type="checkbox"
              id="agree"
              checked={isAgree}
              onChange={handleAgreementToggle}
            />
            <label htmlFor="agree" className={styles.agreementLabel}>
              אני מעוניין לשתף את המידע שמסרתי כאן לצורך השירות מטעם איגוד
              האינטרנט
            </label>
          </div>
        </div>

        {/* Footer Section */}
        <div className={styles.footer}>
          <button className={styles.submitButton} onClick={handleNextStep}>
            אני רוצה נציג
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.contactFlowContainer}>
      {/* Header Section */}
      <div className={styles.header}>
        <button
          className={styles.backButton}
          onClick={() => router.push("/wizard")}
        >
          חזרה
        </button>
        <div className={styles.progressIndicator}>
          <span className={styles.activeDot}></span>
          <span className={styles.inactiveDot}></span>
        </div>
      </div>

      {/* Graphic Section */}
      <div className={styles.graphicPlaceholder}>אייקון</div>

      {/* Content Section */}
      <div className={styles.content}>
        <p className={styles.text}>
          העברתי את המספר, עכשיו תנשום עמוק ותרגע, אתה בידיים טובות.
        </p>
        <textarea
          className={styles.textarea}
          placeholder="יש משהו נוסף שתרצה להוסיף לציון בכתב?"
          value={additionalInput}
          onChange={handleInputChange}
        />
      </div>

      {/* Rating Section */}
      <div className={styles.ratingSection}>
        <button
          className={`${styles.ratingButton} ${
            selectedRating === "טוב" ? styles.selected : ""
          }`}
          onClick={() => handleRatingSelect("טוב")}
        >
          מרגיש טוב
        </button>
        <button
          className={`${styles.ratingButton} ${
            selectedRating === "בסדר" ? styles.selected : ""
          }`}
          onClick={() => handleRatingSelect("בסדר")}
        >
          מרגיש בסדר
        </button>
        <button
          className={`${styles.ratingButton} ${
            selectedRating === "רע" ? styles.selected : ""
          }`}
          onClick={() => handleRatingSelect("רע")}
        >
          מרגיש רע
        </button>
      </div>

      {/* Footer Section */}
      <div className={styles.footer}>
        <button className={styles.submitButton} onClick={handleSubmit}>
          סיום
        </button>
      </div>
      {showPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <p>העברנו את הפניה שלך!</p>
            <p>תרצה לדווח על המקרה? בעזרת דיווח נוכל לעזור לעוד אנשים</p>
            <div className={styles.popupButtons}>
              <button
                className={styles.yesButton}
                onClick={() => router.push("/report")}
              >
                אשמח לעזור
              </button>
              <button
                className={styles.noButton}
                onClick={() => router.push("/wizard")}
              >
                לא תודה
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
