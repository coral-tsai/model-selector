import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Dashboard({ onLogout }) {
  const [swipes, setSwipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSwipes = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/swipes');
        setSwipes(response.data);
        setLoading(false);
      } catch (err) {
        setError('載入資料失敗');
        setLoading(false);
      }
    };

    fetchSwipes();
  }, []);

  const handleBackToHome = () => {
    navigate('/');
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString('zh-TW');
  };

  const getDirectionIcon = (direction) => {
    return direction === 'right' ? '👍' : '👎';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center h-screen">
          <div className="text-lg">載入中...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center h-screen">
          <div className="text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex space-x-4">
              <button
                onClick={handleBackToHome}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
              >
                返回首頁
              </button>
              <button
                onClick={onLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              >
                登出
              </button>
            </div>
          </div>
          <p className="mt-2 text-gray-600">查看所有滑動紀錄</p>
        </div>

        {swipes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">目前沒有任何滑動紀錄</p>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {swipes.map((swipe) => (
                <li key={swipe._id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {swipe.photoId && (
                        <img
                          src={swipe.photoId.url}
                          alt="model"
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      )}
                      <div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl">
                        {getDirectionIcon(swipe.direction)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
} 