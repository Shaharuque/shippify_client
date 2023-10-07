import React, { useState } from 'react';
import ChartForBoxAnalysis from './ChartForBoxAnalysis';
import GroupedStackBar from './GroupedStackBar';
import PayMethodBar from './PayMethodBar';
import MixedChart from './MixedChart';
import StackedBar from './StackedBar';

const MainPage = () => {
    const [show, setShow] = useState('basic')
    const [selectedOption, setSelectedOption] = useState('basic');

    const handleOptionChange = (event: any) => {
        setSelectedOption(event.target.value);
    };

    return (
        <>
            <div className='bg-white ml-[100px] mr-[30px] rounded mt-5'>
                <h1 className='font-bold p-2'>Financial Dashboard</h1>
            </div>

            <div className='grid grid-cols-2 gap-[50px] h-[100vh]  pl-[100px] pr-[30px] py-[30px] overflow-scroll'>
                <div className='bg-white rounded-md p-2'>
                    <ChartForBoxAnalysis></ChartForBoxAnalysis>
                </div>

                {/* <div className='bg-white rounded-md p-2'>
                <div>
                    <button onClick={() => { setShow('basic') }} className="p-2 bg-teal-400 text-white rounded mr-2">Basic</button>
                    <button onClick={() => { setShow('Ltl') }} className="p-2 bg-teal-400 text-white rounded">LTL</button>
                </div>
                {
                    show === 'basic' ?
                        <ChartForBoxAnalysis></ChartForBoxAnalysis>
                        :
                        <GroupedStackBar></GroupedStackBar>
                }
            </div> */}

                <div className='bg-white rounded-md p-2'>
                    {/* <div className='mt-2 flex items-center'>
                    <label className='mr-2 text-[13px] flex items-center'>
                        <input
                            type="radio"
                            name="options"
                            value="basic"
                            checked={selectedOption === 'basic'}
                            onChange={handleOptionChange}
                        />
                        Basic Shipping
                    </label>
                    <label className=' text-[13px] flex items-center'>
                        <input
                            type="radio"
                            name="options"
                            value="ltl"
                            checked={selectedOption === 'ltl'}
                            onChange={handleOptionChange}
                        />
                        LTL Shipping
                    </label>
                </div>
                {
                    selectedOption === 'basic' ?
                        <PayMethodBar></PayMethodBar>
                        :
                        <ChartForBoxAnalysis></ChartForBoxAnalysis>
                } */}

                    <PayMethodBar></PayMethodBar>
                </div>

                <div className='bg-white rounded-md p-2'>
                    <MixedChart></MixedChart>
                </div>

                <div className='bg-white rounded-md p-2'>
                    <StackedBar></StackedBar>
                </div>

            </div>
        </>
    );
};

export default MainPage;