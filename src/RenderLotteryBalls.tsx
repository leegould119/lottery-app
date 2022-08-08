import React from 'react';

interface IMyProps {
    lotteryData: { id?: string, lotteryNumber: number }[],
    getSelectedNumbers: (value: number) => void,
};

const RenderLotteryBalls: React.FC<IMyProps> = ({
    lotteryData,
    getSelectedNumbers,
}) => {
    return (
    <div style={{ padding: '10px', textAlign: 'center' }} className="container-fluid selected-numbers">
      <h4 style={{ color: "#FFFFFF" }}>select six lottery numbers</h4>
      {lotteryData.map(data => (
        <div
          className="balls selectable-balls"
          key={data && data?.id ? data?.id : `id´-${data}`}
          onClick={event => getSelectedNumbers(data.lotteryNumber)}
        >
          {data.lotteryNumber}
        </div>
      ))}
    </div>
    );
  };

  export default RenderLotteryBalls;