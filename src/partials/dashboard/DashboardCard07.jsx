import React from 'react';
import user1 from '../../images/user-36-01.jpg'

function DashboardCard07() {
  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">All User's</h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-slate-300">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Email</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Phone Number</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Age</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">City</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                  <img  className="shrink-0 mr-2 sm:mr-3" width="36" height="36" viewBox="0 0 36 36" src={user1} alt="" />
                    <div className="text-slate-800 dark:text-slate-100">Divya Banode</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">divya@gmail.com</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-emerald-500">1234567891</div>
                </td>
                <td className="p-2">
                  <div className="text-center">26</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500">Nagpur</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                      <img  className="shrink-0 mr-2 sm:mr-3" width="36" height="36" viewBox="0 0 36 36" src={user1} alt="" />
                  
                    <div className="text-slate-800 dark:text-slate-100">Divya Banode</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">divya@gmail.com</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-emerald-500">1234567891</div>
                </td>
                <td className="p-2">
                  <div className="text-center">24</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500">Nagpur</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                  <img  className="shrink-0 mr-2 sm:mr-3" width="36" height="36" viewBox="0 0 36 36" src={user1} alt="" />
                    <div className="text-slate-800 dark:text-slate-100">Divya Banode</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">divya@gmail.com</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-emerald-500">1234567891</div>
                </td>
                <td className="p-2">
                  <div className="text-center">22</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500">Nagpur</div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="flex items-center">
                  <img  className="shrink-0 mr-2 sm:mr-3" width="36" height="36" viewBox="0 0 36 36" src={user1} alt="" />
                    <div className="text-slate-800 dark:text-slate-100">Divya banode</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">divya@gmail.com</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-emerald-500">1234567891</div>
                </td>
                <td className="p-2">
                  <div className="text-center">22</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500">Nagpur</div>
                </td>
              </tr>
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard07;
