import React from 'react';

interface IMyProps {
    lotteryData: number[],
    title: string,
};

const RenderResults: React.FC<IMyProps> = ({
    lotteryData,
    title,
}) => {
    return (
        <div className="container-fluid selected-numbers">
            <h4 style={{ color: "#FFFFFF" }}>{title}</h4>
            {lotteryData.map(numbers => (
                <div
                    className="balls lucky-dip-balls"
                    key={`id´-${numbers}`}
                >
                    {numbers}
                </div>
            ))}
        </div>
    );
};

export default RenderResults;