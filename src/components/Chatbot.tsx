import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
//@ts-ignore
import ChatBot, { Loading } from 'react-simple-chatbot';
import { useSession } from 'next-auth/react';

const DBPedia = ({ steps, triggerNextStep }) => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState('');
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const search = steps.search.value;
    const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${encodeURIComponent(
      search
    )}`;

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.query && data.query.search && data.query.search.length > 0) {
          setResult(data.query.search[0].snippet);
        } else {
          setResult('Not found.');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
        setResult('An error occurred while fetching the data.');
      }
    };

    fetchData();
  }, [steps.search.value]);

  const triggetNext = () => {
    setTrigger(true);
    triggerNextStep();
  };

  return (
    <div className="dbpedia text-black">
      {loading ? <Loading /> : result}
      {!loading && (
        <div style={{ textAlign: 'center', marginTop: 20, color: 'black' }}>
          {!trigger && (
            <button onClick={triggetNext}>Search Again</button>
          )}
        </div>
      )}
    </div>
  );
};

DBPedia.propTypes = {
  steps: PropTypes.object,
  triggerNextStep: PropTypes.func,
};

DBPedia.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined,
};

const Chatbot = () => {
  const session = useSession();
  
  return (
    <div className="text-black ml-2 flex justify-center top-1 relative flex-wrap w-[100%]">
      <ChatBot
        width="fit"
        steps={[
          {
            id: '0',
            message: `Hey ${session.data?.user.name!==undefined ? session.data?.user.name : 'user'}`,
            trigger: '1',
          },
          {
            id: '1',
            message: 'Type something to search on Wikipedia. (Ex.: Brazil)',
            trigger: 'search',
          },
          {
            id: 'search',
            user: true,
            trigger: '3',
          },
          {
            id: '3',
            component: <DBPedia />,
            waitAction: true,
            trigger: '1',
          },
        ]}
      />
    </div>
  );
};

export default Chatbot;
