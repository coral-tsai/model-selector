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

  // 將 swipes 按 model 分組
  const groupSwipesByModel = () => {
    const grouped = {};
    
    swipes.forEach(swipe => {
      if (swipe.photoId) {
        const modelId = swipe.photoId._id;
        if (!grouped[modelId]) {
          grouped[modelId] = {
            model: swipe.photoId,
            likes: 0,
            dislikes: 0,
            totalSwipes: 0,
            lastSwipeTime: null
          };
        }
        
        if (swipe.direction === 'right') {
          grouped[modelId].likes++;
        } else {
          grouped[modelId].dislikes++;
        }
        
        grouped[modelId].totalSwipes++;
        
        // 記錄最後一次滑動時間
        if (!grouped[modelId].lastSwipeTime || new Date(swipe.timestamp) > new Date(grouped[modelId].lastSwipeTime)) {
          grouped[modelId].lastSwipeTime = swipe.timestamp;
        }
      }
    });
    
    // 轉換為陣列並按總滑動次數和喜歡率排序
    return Object.values(grouped).sort((a, b) => {
      // 先按總滑動次數排序（從高到低）
      if (a.totalSwipes !== b.totalSwipes) {
        return b.totalSwipes - a.totalSwipes;
      }
      // 總滑動次數相同時，按喜歡率排序（從高到低）
      const rateA = a.totalSwipes > 0 ? (a.likes / a.totalSwipes) : 0;
      const rateB = b.totalSwipes > 0 ? (b.likes / b.totalSwipes) : 0;
      return rateB - rateA;
    });
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

  const groupedSwipes = groupSwipesByModel();

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
          <p className="mt-2 text-gray-600">查看所有 model 的篩選統計</p>
        </div>

        {groupedSwipes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">目前沒有任何滑動紀錄</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {groupedSwipes.map((group) => (
              <div key={group.model._id} className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={group.model.url}
                      alt="model"
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Model #{group.model._id.slice(-6)}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">總滑動次數:</span>
                      <span className="text-lg font-bold text-gray-900">{group.totalSwipes}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700 flex items-center">
                        <span className="mr-2">👍 喜歡:</span>
                      </span>
                      <span className="text-lg font-bold text-green-600">{group.likes}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700 flex items-center">
                        <span className="mr-2">👎 不喜歡:</span>
                      </span>
                      <span className="text-lg font-bold text-red-600">{group.dislikes}</span>
                    </div>
                    
                    <div className="pt-2 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">喜歡率:</span>
                        <span className="text-lg font-bold text-blue-600">
                          {group.totalSwipes > 0 ? Math.round((group.likes / group.totalSwipes) * 100) : 0}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 