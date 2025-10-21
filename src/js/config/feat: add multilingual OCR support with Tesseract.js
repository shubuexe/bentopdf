import Tesseract from "tesseract.js";

export const tesseractLanguages = {
  eng: "English",
  afr: "Afrikaans",
  amh: "Amharic",
  ara: "Arabic",
  // ...add more
};

export function initOcrLanguageDropdown() {
  const dropdown = document.getElementById("ocrLanguageDropdown");
  const fileInput = document.getElementById("ocrFile");
  const outputArea = document.getElementById("ocrOutput");
  const processBtn = document.getElementById("ocrProcessBtn");

  if (!dropdown || !fileInput || !outputArea || !processBtn) return;

  let selectedLang = dropdown.value || "eng";
  let selectedFile = null;

  dropdown.addEventListener("change", (e) => {
    selectedLang = e.target.value;
  });

  fileInput.addEventListener("change", (e) => {
    selectedFile = e.target.files[0];
  });

  processBtn.addEventListener("click", async () => {
    if (!selectedFile) return;

    processBtn.disabled = true;
    processBtn.textContent = "Processing...";

    const { data } = await Tesseract.recognize(selectedFile, selectedLang);
    outputArea.value = data.text;

    processBtn.disabled = false;
    processBtn.textContent = "Extract Text";
  });
}
