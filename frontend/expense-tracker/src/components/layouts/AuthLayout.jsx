import {LuTrendingUpDown} from 'react-icons/lu'
import CARD_2 from '../../assets/images/card2.png'

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className='flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-purple-400/10 border border-gray-200/50 z-10'>
      <div className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}>
        {icon}
      </div>
      <div>
        <h6 className='text-xs text-gray-500 mb-0'>{label}</h6>
        <span className='text-[20px]'>${value}</span>
      </div>
    </div>
  )
}


const Authlayout = ({ children }) => {
  return (
    <div className='flex w-screen h-screen'>

      {/* 1. Left Side: Form Container */}
      <div className='w-full h-screen md:w-[60vw] px-12 pt-8 pb-12 flex flex-col'>
        <h2 className='text-lg font-medium text-black'>
          Expense Tracker
        </h2>

        {/* FIX: pt-[15vh] creates the vertical offset, pushing the content down from the logo */}
        <div className='w-full pt-[15vh]'>
          {children}
        </div>
      </div>

      {/* 2. Right Side: Visual Panel */}
      <div className='hidden md:block w-[40vw] h-screen bg-violet-50 overflow-hidden p-8 relative'>

        {/* Shape 1 */}
        <div className='w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 left-8'></div>

        {/* Shape 2: Corrected border typo */}
        <div className='w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] -right-10'></div>

        {/* Shape 3 */}
        <div className='w-48 h-48 rounded-[40px] bg-violet-500 absolute -bottom-7 -left-5'></div>

        {/* Stat Info Card - Positioning */}
        <div className='grid grid-cols-1 z-20 absolute top-10 right-10'>
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track Your Income & Expenses"
            value="430,000"
            color="bg-purple-600"
          />
        </div>

        {/* The Card Image Container (Graph) */}
        <div className='w-64 lg:w-[90%] absolute bottom-10 right-1/2 translate-x-1/2 lg:translate-x-0 lg:right-4 shadow-lg shadow-black/80 rounded-xl'>
          <img
            src={CARD_2}
            className='w-full h-auto rounded-xl'
            alt="All Transactions Dashboard Card"
          />
        </div>
      </div>
    </div>
  );
};
export default Authlayout;


