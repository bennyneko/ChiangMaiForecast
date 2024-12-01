'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

/* Import supabase client */
import { supabase } from './utils/supabaseClient';

interface WeatherData {
  date: string;
  detailed_aqi: number;
  model_pm_25: number;
  location_id: number;
  is_forecast: boolean;
  pm_25?: number;
}

interface LineChartProps {
  data: WeatherData[];
}

const AQITable = () => {
  const data = [
    {
      aqi: "0-25",
      pm25: "0-15.0",
      pm10: "0-50",
      quality: "คุณภาพอากาศดีมาก",
      description: "คุณภาพอากาศดีมาก เหมาะสำหรับกิจกรรมกลางแจ้งและการท่องเที่ยว",
      backgroundColor: "bg-sky-400"
    },
    {
      aqi: "26-50",
      pm25: "15.1-25.0",
      pm10: "51-80",
      quality: "คุณภาพอากาศดี",
      description: "คุณภาพอากาศดี สามารถทำกิจกรรมกลางแจ้งและท่องเที่ยวได้ตามปกติ",
      backgroundColor: "bg-green-500"
    },
    {
      aqi: "51-100",
      pm25: "25.1-37.5",
      pm10: "81-120",
      quality: "คุณภาพอากาศปานกลาง",
      description: "[ประชาชนทั่วไป] สามารถทำกิจกรรมกลางแจ้งได้ตามปกติ [ประชาชนในกลุ่มเสี่ยง] ถ้ามีอาการเบื้องต้น เช่น ไอ หายใจลำบาก ระคายเคือง ตา ควรลดระยะเวลาการทำกิจกรรมกลางแจ้ง",
      backgroundColor: "bg-yellow-400"
    },
    {
      aqi: "101-200",
      pm25: "37.6-75.0",
      pm10: "121-180",
      quality: "คุณภาพอากาศมีผลกระทบต่อสุขภาพ",
      description: "[ประชาชนทั่วไป] ควรเฝ้าระวังสุขภาพ ถ้ามีอาการเบื้องต้น เช่น ไอ หายใจลำบาก ระคาย เคืองตา ควรลดระยะเวลาการทำกิจกรรมกลางแจ้ง หรือใช้อุปกรณ์ป้องกันตนเองหากมีความจำเป็น [ประชาชนในกลุ่มเสี่ยง] ควรลดระยะเวลาการทำกิจกรรมกลางแจ้ง หรือใช้อุปกรณ์ ป้องกันตนเองหากมีความจำเป็น ถ้ามีอาการทางสุขภาพ เช่น ไอ หายใจลำบาก ตาอักเสบ แน่นหน้าอก ปวดศีรษะ หัวใจเต้นไม่เป็นปกติ คลื่นไส้ อ่อนเพลีย ควรพบแพทย์",
      backgroundColor: "bg-orange-500"
    },
    {
      aqi: ">200",
      pm25: ">75.1",
      pm10: ">180",
      quality: "คุณภาพอากาศมีผลกระทบต่อสุขภาพมาก",
      description: "ประชาชนทุกคนควรหลีกเลี่ยงกิจกรรมกลางแจ้ง หลีกเลี่ยงพื้นที่ที่มีมลพิษทางอากาศสูง หรือใช้อุปกรณ์ป้องกันตนเองหากมีความจำเป็น หากมีอาการทางสุขภาพควรพบแพทย์",
      backgroundColor: "bg-red-600"
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <table className="w-full border-collapse">
        <thead className="bg-gray-900 text-white text-sm">
          <tr>
            <th className="p-3 text-center">AQI</th>
            <th className="p-3 text-center">PM<sub>2.5</sub> เฉลี่ย<br />24 ชั่วโมงต่อเนื่อง<br />(μg/m<sup>3</sup>)</th>
            <th className="p-3 text-center">PM<sub>10</sub> เฉลี่ย<br />24 ชั่วโมงต่อเนื่อง<br />(μg/m<sup>3</sup>)</th>
            <th className="p-3 text-center">ความหมาย</th>
            <th className="p-3 text-center">แนวทางการป้องกัน</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className={`${row.backgroundColor}`}>
              <td className="p-3 border-t border-gray-200 text-white">{row.aqi}</td>
              <td className="p-3 border-t border-gray-200 text-white">{row.pm25}</td>
              <td className="p-3 border-t border-gray-200 text-white">{row.pm10}</td>
              <td className="p-3 border-t border-gray-200 text-white">{row.quality}</td>
              <td className="p-3 border-t border-gray-200 text-white text-xs">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const SimpleLineChart: React.FC<LineChartProps> =  ({ data  }) => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 10,
            bottom: 20
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            tickLine={{ stroke: '#E5E7EB' }}
            axisLine={{ stroke: '#E5E7EB' }}
          />
          <YAxis
            dataKey="detailed_aqi"
            tick={{ fontSize: 12 }}
            tickLine={{ stroke: '#E5E7EB' }}
            axisLine={{ stroke: '#E5E7EB' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #E5E7EB',
              borderRadius: '6px',
              fontSize: '12px'
            }}
          />
          <Line
            type="monotone"
            dataKey="pm_25"
            stroke="#2196F3"
            strokeWidth={2}
            dot={{
              fill: '#2196F3',
              r: 4
            }}
            activeDot={{
              fill: '#2196F3',
              r: 6
            }}
          />
          
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
const PM25Forecast = () => {
  /* In this pages, we need to have : 
  1. Hourly Data in 7 days span
  2. Daily Data in 7 days span
  
  */
  const [currentHourData, setCurrentHourData] = useState<WeatherData | null>(null);
  const [currentDayData, setCurrentDayData] = useState<WeatherData | null>(null);
  const [hourlyData, setHourlyData] = useState<WeatherData[]>([]);
  const [dailyData, setDailyData] = useState<WeatherData[]>([]);
const levelColor = ['bg-blue-300', 'bg-green-300', 'bg-yellow-300', 'bg-orange-300', 'bg-red-300', 'bg-gray-300']; 
const classifyAQI = (aqi: number | null): number => {
  if (!aqi) return 5;
  if (aqi <= 25) return 0;
  if (aqi <= 50) return 1;
  if (aqi <= 100) return 2;
  if (aqi <= 200) return 3;
  if (aqi > 200) return 4;
  return 5;
};

const classifyColor = (aqi: number | null): string => {
  return levelColor[classifyAQI(aqi)];
};
 const dayNames = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];
 useEffect(()=> {
    /* Fetch Hourly Data in 7-days recents timestamp */
    const fetchHourlyData = async () => {
      // Select data in the date range of 7 days
      const now = new Date();
      const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
      const sevenDaysNext = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      const { data, error } = await supabase
       .from('hourly-weather-data')
        .select('*')
        .gte('date', oneHourAgo.toISOString())
        .lte('date', sevenDaysNext.toISOString())
        .filter('location_id', 'eq', 1)
        .filter('is_forecast', 'eq', true)
        .order('date', { ascending: true }); // TODO : Will correct how we calculate the AQI later
      console.log('data', data);
      if (error) console.log('error', error);
      // don't forget to conver to local time
      const currentHour = new Date().getHours();
      const currentDay = new Date().getDate();
      console.log('currentHour', currentHour);
      console.log('currentDay', currentDay);
      const filteredData = data && data.filter(item => {
        const itemDate = new Date(item.date.toLocaleString());
        return (itemDate.getHours() === currentHour) && (itemDate.getDate() === currentDay);
      });
      console.log('filteredData', filteredData);
      setCurrentHourData(filteredData? filteredData[0] : null);
      setHourlyData(data?.map((item)=> ({...item, date: new Date(item.date).toLocaleTimeString()})));
    };
    const fetchDailyData = async () => {
      // Select data in the date range of 7 days
      const oneDayAgo = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
      const sevenDaysNext = new Date(oneDayAgo.getTime() + 7 * 24 * 60 * 60 * 1000);

      const { data, error } = await supabase
        .from('weather-data')
        .select('*')
        .gte('date', oneDayAgo.toISOString())
        .lte('date', sevenDaysNext.toISOString())
        .filter('location_id', 'eq', 1)
        .filter('is_forecast', 'eq', true)
        .order('date', { ascending: true })
      if (error) console.log('error', error);
      console.log('data', data);
      setCurrentDayData(data? data[0] : null);
      setDailyData(data);
    }
    fetchHourlyData();
    const interval = setInterval(fetchHourlyData, 3600000); // Refresh every hour
    fetchDailyData();
    return () => clearInterval(interval);    
 },[])
 useEffect(() => {

 },[currentHourData])
  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <h1 className="text-2xl font-bold mb-6"> <span className='text-violet-500'>Chiangmai</span> &nbsp; PM2.5 Forecast</h1>
      {/* Banner for the landing page with big title and description below*/}
      <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">พยากรณ์มลพิษในเชียงใหม่</h2>
        <p className="text-white text-sm">พยากรณ์คุณภาพอากาศในเชียงใหม่ ให้คุณทราบถึงคุณภาพอากาศในเชียงใหม่ในระยะเวลา 7 วัน รวมถึงค่า PM2.5 ในแต่ละวัน และพยากรณ์คุณภาพอากาศในชั่วโมงละ 24 ชั่วโมง</p>
      </div>
      <div className='flex flex-row w-auto'>
        {/* Current Air Quality */}
      <div className="mb-8">
        <h4 className='text-violet-500 font-bold'>วันนี้</h4>
        <h1 className="text-3xl font-bold mb-2">คุณภาพอากาศปัจจุบัน</h1>
        <h4 className='text-sm mb-4'>ดัชนีคุณภาพอากาศ (AQI⁺) และมลพิษทางอากาศ PM2.5</h4>
        <div className="flex flex-row items-center">
          <div className={"w-64 h-64 rounded-full bg-[#F4D03F] flex items-center justify-center mx-auto shrink-0 " + classifyColor(currentDayData? currentDayData.detailed_aqi : null)}>
            <div className="text-center">
              <div className="text-4xl font-bold">{currentDayData? currentDayData.detailed_aqi.toFixed(0) : null}</div>
              <div className="text-sm">Thai AQI</div>
            </div>
          </div>
           {/* PM2.5 Stats */}
      <div className="w-auto">
        <div className="p-6">
          <h3 className="font-bold mb-4">คุณภาพอากาศในประเทศ</h3>
          <h4 className='text-sm'> [ประชาชนทั่วไป] สามารถทำกิจกรรมกลางแจ้งได้ตามปกติ <br/>[ประชาชนกลุ่มเสี่ยง] หากมีอาการเบื้องต้น เช่น ไอ หายใจลำบาก ระคายเคืองตา ควรลดระยะเวลาการทำกิจกรรมกลางแจ้ง</h4>
          <hr className="my-4" />
          <div className="flex space-x-2 mb-4 flex-col">
            <div className="text-sm font-bold">PM2.5 เฉลี่ย 24 ชั่วโมง</div>
            <div className="font-bold">{currentDayData? (currentDayData.model_pm_25/2).toFixed(2) : null} μg/m³</div>
          </div>
        </div>
      </div>
        </div>
      </div>

     
      </div>
      

      {/* Weekly Forecast */}
      <div className="mb-8">
        <h4 className='text-violet-500 font-bold'>พยากรณ์</h4>
        <h1 className="font-bold text-3xl mb-2">พยากรณ์มลพิษรายวัน</h1>
        <h4 className='text-sm mb-8'>พยากรณ์ปริมาณฝุ่นมลพิษ PM2.5</h4>
        <div className="grid grid-cols-7 gap-2">
          {dailyData.map((day, idx) => {
              let dayName = dayNames[new Date(day.date).getDay()];
              if (idx === 0) dayName = 'วันนี้';
              if (idx === 1) dayName = 'พรุ่งนี้';
            return (
              <div key={dayName} className="text-center min-w-0">
                <div className="text-sm mb-1 truncated">{dayName}</div>
                <div className={classifyColor(day.detailed_aqi) + " py-2  rounded"}>
                  <div className="text-sm font-bold">{day.model_pm_25? (day.model_pm_25/2).toFixed(2) : -1}</div>
                  <div className="text-xs">μg/m³</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Line Chart */}
      <div className='mb-16'>
        <h3 className="font-bold text-3xl mb-4">พยากรณ์มลพิษรายชั่วโมง</h3>
        <div className="h-48">
          <SimpleLineChart data={hourlyData} />
        </div>
      </div>
      
      {/* Table Info & Footer */}
      <div className='flex items-center justify-center text-center text-xs py-8 leading-loose'>
        ขอบคุณที่เยี่ยมชมเว็บไซต์คาดการณ์ PM2.5 ในจังหวัดเชียงใหม่ เว็ปไซต์นี้จัดทำขึ้นเพื่อการศึกษา <br/> หวังว่าข้อมูลและการคาดการณ์ที่แสดงนี้จะช่วยให้คุณได้รู้เกี่ยวกับมลพิษทางอากาศล่วงหน้าได้พร้อมเตรียมรับมือกับสถานการณ์ในชีวิตประจำวัน
      </div>
      
      <AQITable />
    </div>
  );
};

export default PM25Forecast;