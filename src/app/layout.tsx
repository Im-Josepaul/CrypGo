'use client';

import { DM_Sans } from "next/font/google";
import "./globals.css";
import currPrice from "./api/retreiver";
import { useEffect, useState } from "react";
import ReactLoading from 'react-loading';
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import NotFound from "../components/NotFound/index"
import { ThemeProvider } from "next-themes";
import ScrollToTop from "../components/ScrollToTop";
import Aoscompo from "../utils/aos";
const font = DM_Sans({ subsets: ["latin"] });

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isData, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const cachedPriceData = sessionStorage.getItem('cachedPriceData');
      if (cachedPriceData) {
        const parsedData = JSON.parse(cachedPriceData);
        if (typeof(parsedData) === 'object') {
          setData(parsedData);
        }
      }
    } catch (err) {
      console.error('Error loading cached data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const result:any = await currPrice();
        
        if (!mounted) return;
        
        if (typeof(result) === 'object' && result!= null) {
          setData(result);
          try {
            sessionStorage.setItem('cachedPriceData', JSON.stringify(result));
          } catch (err) {
            console.error('Failed to store data in the current session:', err);
          }
        } else {
          throw new Error('No valid data was received from currency api.');
        }
      } catch (err:any) {
        if (!mounted) return;
        setError(err.message);
      } finally {
        if (!mounted) return;
        setIsLoading(false);
      }
    };
    
    if (!sessionStorage.getItem('cachedPriceData')) {
      fetchData();
    }
    
    return () => {
      mounted = false;
    };
  }, []);

  if (isLoading) return(
    <html>
      <head>
        <link rel="icon" type="image/vnd.icon" href="/images/favicon.ico"></link>
      </head>
      <body className="loading-body">
          <div className="loading">
            <h3 className="text">Loading</h3>
            <ReactLoading type="cylon" color="rgb(153 227 158)" height={100} width={100} />
          </div>
      </body>
    </html>
  ) 
  if (error) return(
    <html>
      <body className="loading-body">
          <NotFound error={error} />
      </body>
    </html>

  ) 

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/vnd.icon" href="/images/favicon.ico"></link>
      </head>
      <body className={`${font.className}`}>
        <ThemeProvider
          attribute="class"
          enableSystem={true}
          defaultTheme="system"
        >
          <Aoscompo>
            <Header />
            {children}
            <ToastContainer className={"toastContainer"} autoClose= {3000} />
            <Footer />
          </Aoscompo>
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
