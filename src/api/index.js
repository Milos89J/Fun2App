/*export const fetch = () => {
  return {
    1546968934: {
      id: "1546968934",
      title: "Test one",
      notes: "I started today and it was not good.",
      progress: 0,
      category: "1546969049",
      createdAt: 1546969144391,
      updatedAt: 1546969144391,
    },
    1546969212: {
      id: "1546969212",
      title: "Test two",
      notes: "These task are super nice",
      progress: 0,
      category: "1546969049",
      createdAt: 1546969144391,
      updatedAt: 1546969144391,
    },
  };
};
*/

import fakeApi from '@/lib/fakeApi'

const generateId = () => Math.floor(new Date() * Math.random());

export const fetch = () => {
 return fakeApi.get('activities', {force: 1})
};

export const fetchCategories = () => {
  return fakeApi.get('categories', {force: 1})
};

export const fetchUser = () => {
  return {
    name: "Milos Jeremic",
    id: "-Aj34jknvncx98812",
  };
};

export const createActivityAPI = (activity) => {
  activity.id = generateId();
  activity.progress = 0;
  activity.createdAt = new Date();
  activity.updatedAt = new Date();

  return fakeApi.post('activities', activity)

  
};
export const deleteActivityAPI = (activity) => {
  return fakeApi.delete('activities', activity)
}


