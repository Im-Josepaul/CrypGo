import { useState, useEffect, useRef } from "react";
import {toast} from "react-toastify";
import { Icon } from "@iconify/react/dist/iconify.js";
import Logo from "../../Layout/Header/Logo";
import QRCode from 'qrcode';
import { CryptoNames } from "../../../app/api/data";

const BuyCrypto = () => {
  const [loading, setLoading] = useState(false);
  const [nextPageData, setNextPageData] = useState<{
    upiURL: string;
    amount: number;
    note?: string; 
  }>({
    upiURL: "",
    amount: 0,
    note: ""
  });
  const [nextPage, setNextPage] = useState(false);
  const [imageFile, setImageFile] = useState<File>();
  const [fileName, setFileName] = useState<string>("");
  const [walletAddress, setAddress] = useState<string>("");
  const [formData, setFormData] = useState<{
    name: string;
    price: string;
    amount: string;
  }>({
    name: "",
    price: "0",
    amount: "",
  });

  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2
  });

  type Props = {
    upiId: string;
    name: string;
    amount: number;
    note?: string; 
  };

  const upiId = 'jose.paul@superyes';
  const nameOfReciever = "Jose Paul";
  const walletInputRef = useRef<HTMLInputElement | null>(null);
  const qrImgRef = useRef<HTMLImageElement>(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  let priceData: any = sessionStorage.getItem('cachedPriceData');
  priceData = JSON.parse(priceData);

  useEffect(() => {
    if (CryptoNames) {
      setFormData((prevData) => ({
        ...prevData,
        name: CryptoNames["BTC"],
        price: priceData["BTC"].value,
      }));
    }
  }, []);

  useEffect(() => {
    if (nextPage) {
      if (walletInputRef.current) {
        walletInputRef.current.focus();
      }
      const upiLink:string = nextPageData.upiURL;
      const imgTag = qrImgRef.current
      QRCode.toDataURL(upiLink, { width: 256 })
          .then(url => {
            if(imgTag){
              imgTag.src = url;
            }
          })
          .catch(err => {
            console.error("Failed to generate QR Code", err);
            alert("QR generation failed.");
        });
    }
  }, [nextPage]);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    if (name === "amount") {
      setFormData((prevData) => ({ ...prevData, amount: value }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file); // store file to attach to email later  
      setFileName(file.name);
    }
  };

  const handleDropdownSelect = (crypto: string) => {
    setFormData((prevData) => ({
      ...prevData,
      name: crypto,
      price: priceData[crypto].value,
    }));
    setIsDropdownOpen(false);
  };

  const totalCost = formData.amount
    ? (parseFloat(formData.price.replace(/[^0-9.]/g, '')) * parseFloat(formData.amount)).toFixed(2)
    : "0.00";
  


  const handleSubmit = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if(walletAddress && imageFile){
      setLoading(true);
      try {
        let base64Image = "";
        if (imageFile) {
          const fileToBase64 = (file: File): Promise<string> =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => resolve(reader.result as string);
              reader.onerror = reject;
            });

          base64Image = await fileToBase64(imageFile);
        }

        const res = await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            note: `Purchase request for ${formData.amount} of ${formData.name} token \nToken to be transferred to ${walletAddress}`,
            filename: fileName,
            base64Image,
          }),
        });

        if (!res.ok) throw new Error("Failed to send email");
        toast.success("Crypto purchase successful. Data will be verified soon.");
        setFormData((prevData) => ({ ...prevData, amount: "" }));
      } catch (error) {
        toast.error("An error occurred during the purchase.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }else if(!walletAddress && imageFile){
      toast.error("Enter a valid wallet address");
      // alert("Enter a valid wallet address");
    }else if(walletAddress && !imageFile){
      toast.error("Please upload a valid screenshot.");
      // alert("Please upload a valid screenshot.");
    }
    else{
      toast.error("Both Wallet Address and Screenshot is missing. Please provide valid input!");
      // alert("Both walletAddress and Screenshot is missing. Please provide valid input!");
    }
  };

  const nextPageParse = (amount: string,nameCrypto: string) => {
    if(amount === ""){
      // alert("Please enter a valid amount");
      toast.error("Please enter a valid amount");

    }else{
      const cost:number = Number(Number(totalCost) + Number(totalCost)*10/100);
      const message:string = `Need ${amount} quantity of ${nameCrypto} token`;
      const upiURL:string = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(nameOfReciever)}&am=${cost}&cu=INR&tn=${encodeURIComponent(message)}`;
      setNextPageData((prevData) => ({
        ...prevData,
        upiURL: upiURL,
        amount: cost,
        note: message
      }));
      document.getElementById("header")?.classList.replace("z-50", "z-51");
      setNextPage(true);
    }
  }

    const navbarChanger = () => {
    document.getElementById("header")?.classList.replace("z-51", "z-50");
    setNextPage(false);
    }


  return (
    <div className="max-w-md mx-auto">
      <div className="flex justify-center mb-16">
        <Logo />
      </div>
      {nextPage ? (
        <form>
            <button
            onClick={() => navbarChanger()}
            className="absolute top-0 left-8 mr-8 mt-8 dark:invert"
            aria-label="Close Buy Modal"
          >
            <Icon
              icon="tabler:arrow-left"
              className="text-white hover:text-primary text-30 inline-block me-2"
            />
          </button>
          <div className="mb-4">
              <p className="flex justify-between text-white">Enter your wallet adderss:</p>
              <input
                ref={walletInputRef}
                id="wallet-address"
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                name="wallet-address"
                className="text-white bg-transparent border border-dark_border border-opacity-60 rounded-md px-3 py-2 w-full focus:border-primary focus-visible:outline-0"
                required
              />
              <div className="bg-green-300 p-1 rounded-lg border border-green-300 qr-img ">
                <img ref={qrImgRef} id="qrImg" src="/images/Default QR Code.png"></img>
                <a
                  href={nextPageData.upiURL}
                  className="text-darkmode font-medium text-18 bg-primary px-2 border border-primary rounded-lg py-3 hover:text-primary hover:bg-transparent pay-btn block text-center mt-2"
                >
                  Click to Pay
                </a>
              </div> 
              <div className="mb-4">
                <p className="text-left text-white">Upload the screenshot of the transaction:</p>
                <div className="flex items-center gap-3">
                  <p className="text-white text-m">File:</p>
                  <label className="cursor-pointer bg-transparent text-white border border-green-500 px-3 py-1 rounded-md text-m">
                    Upload
                    <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                    required
                    />
                  </label>
                  {fileName && <span className="text-white text-m">{fileName}</span>}
                </div>
              </div>

          </div>
            <button
      className={`group text-darkmode font-medium text-18 bg-primary w-full border border-primary rounded-lg py-3 hover:text-primary hover:bg-transparent flex items-center justify-center`}
      onClick={(e) => handleSubmit(e)}
      disabled={loading}
    >
      {loading ? (
        <svg
          className="animate-spin h-5 w-5 text-black group-hover:text-primary"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
          ></path>
        </svg>
      ) : (
        "Complete Transaction"
      )}
    </button>
        </form>
      ) : (
        <form>
          <div className="mb-4 relative">
            <div
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="flex items-center cursor-pointer text-white bg-transparent border border-dark_border border-opacity-60 rounded-md px-3 py-2 text-start"
            >
              {formData.name}
              <span className="text-muted text-lg ml-auto">▼</span>
            </div>
            {isDropdownOpen && (
              <div className="absolute z-10 bg-dark border border-dark_border border-opacity-60 mt-1 rounded-md w-full max-h-60 overflow-y-auto scroll-hide">
                {Object.entries(CryptoNames).map(([key, value]) => (
                  <div
                    key={key}
                    onClick={() => handleDropdownSelect(key)}
                    className="px-3 bg-dark_grey text-white hover:text-darkmode py-2 hover:bg-primary cursor-pointer"
                  >
                    {value}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mb-4">
            <input
              id="crypto-price"
              type="text"
              name="price"
              className="text-white bg-transparent border border-dark_border border-opacity-60 rounded-md px-3 py-2 w-full focus:border-primary focus-visible:outline-0"
              value={`${formData.price}`}
              disabled
              required
            />
          </div>
          <div className="mb-4">
            <input
              id="amount"
              type="number"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
              min="0"
              required
              className="text-white bg-transparent border border-dark_border border-opacity-60 rounded-md px-3 py-2 w-full focus:border-primary focus-visible:outline-0"
            />
          </div>
          <div className="flex justify-between mb-4 text-white">
            <p>Total Cost: </p>
            <p>{formatter.format(Number(totalCost) + Number(totalCost)*10/100)}</p>
          </div>
          <button className="text-darkmode font-medium text-18 bg-primary w-full border border-primary rounded-lg py-3 hover:text-primary hover:bg-transparent"
          onClick={() => nextPageParse(formData.amount,formData.name)}>
            I'm ready to Pay
          </button>
        </form>
      )}   
    </div>
  );
};

export default BuyCrypto;
