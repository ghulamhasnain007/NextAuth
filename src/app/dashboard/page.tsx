// import React from 'react'

// export default function Dashboard() {
//     const posts = [
//         {
//           id: 1,
//           title: 'Boost your conversion rate',
//           href: '#',
//           description:
//             'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
//           date: 'Mar 16, 2020',
//           datetime: '2020-03-16',
//           category: { title: 'Marketing', href: '#' },
//           author: {
//             name: 'Michael Foster',
//             role: 'Co-Founder / CTO',
//             href: '#',
//             imageUrl:
//               'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//           },
//         },
//         {
//           id: 2,
//           title: 'Boost your conversion rate',
//           href: '#',
//           description:
//             'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
//           date: 'Mar 16, 2020',
//           datetime: '2020-03-16',
//           category: { title: 'Marketing', href: '#' },
//           author: {
//             name: 'Michael Foster',
//             role: 'Co-Founder / CTO',
//             href: '#',
//             imageUrl:
//               'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//           },
//         },
//         // More posts...
//       ]

//     return (
//         <div className="bg-white py-24 sm:py-32">
//           <div className="mx-auto max-w-7xl px-6 lg:px-8">
//             <div className="mx-auto max-w-2xl lg:mx-0">
//               <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
//               <p className="mt-2 text-lg leading-8 text-gray-600">
//                 Learn how to grow your business with our expert advice.
//               </p>
//             </div>
//             <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
//               {posts.map((post) => (
//                 <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
//                   <div className="flex items-center gap-x-4 text-xs">
//                     <time dateTime={post.datetime} className="text-gray-500">
//                       {post.date}
//                     </time>
//                     <a
//                       href={post.category.href}
//                       className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
//                     >
//                       {post.category.title}
//                     </a>
//                   </div>
//                   <div className="group relative">
//                     <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
//                       <a href={post.href}>
//                         <span className="absolute inset-0" />
//                         {post.title}
//                       </a>
//                     </h3>
//                     <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>
//                   </div>
//                   <div className="relative mt-8 flex items-center gap-x-4">
//                     <img alt="" src={post.author.imageUrl} className="h-10 w-10 rounded-full bg-gray-50" />
//                     <div className="text-sm leading-6">
//                       <p className="font-semibold text-gray-900">
//                         <a href={post.author.href}>
//                           <span className="absolute inset-0" />
//                           {post.author.name}
//                         </a>
//                       </p>
//                       <p className="text-gray-600">{post.author.role}</p>
//                     </div>
//                   </div>
//                 </article>
//               ))}
//             </div>
//           </div>
//         </div>
//       )
// }


import React from 'react'

export default function Dashboard() {
const posts = [
    {
      id: 1,
      title: 'Boost your conversion rate',
      href: '#',
      description:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
      date: 'Mar 16, 2020',
      datetime: '2020-03-16',
      category: { title: 'Marketing', href: '#' },
      author: {
        name: 'Michael Foster',
        role: 'Co-Founder / CTO',
        href: '#',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      id: 2,
      title: 'Boost your conversion rate',
      href: '#',
      description:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
      date: 'Mar 16, 2020',
      datetime: '2020-03-16',
      category: { title: 'Marketing', href: '#' },
      author: {
        name: 'Michael Foster',
        role: 'Co-Founder / CTO',
        href: '#',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    // More posts...
  ]
  
    return (
            <div className="bg-white py-24 sm:py-32">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
                  <p className="mt-2 text-lg leading-8 text-gray-600">
                    Learn how to grow your business with our expert advice.
                  </p>
                </div>
                <div className="mx-auto mt-10 max-w-2xl grid grid-cols-1 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none">
                  {posts.map((post) => (
                    <article key={post.id} className="flex flex-col bg-blue-400 p-5 rounded-lg lg:flex-row items-start gap-x-6">
                      {/* Add blog image */}
                      <img
                        src="https://via.placeholder.com/150x150" // Replace with your image URL
                        alt={post.title}
                        className="w-48 h-48 rounded-lg object-cover"
                      />
                      
                      {/* Blog content on the right */}
                      <div className="flex flex-col justify-between">
                        <div className="flex items-center gap-x-4 text-xs">
                          <time dateTime={post.datetime} className="text-gray-500">
                            {post.date}
                          </time>
                          <a
                            href={post.category.href}
                            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                          >
                            {post.category.title}
                          </a>
                        </div>
                        <div className="group relative">
                          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                            <a href={post.href}>
                              <span className="absolute inset-0" />
                              {post.title}
                            </a>
                          </h3>
                          <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>
                        </div>
                        <div className="relative mt-8 flex items-center gap-x-4">
                          <img alt="" src={post.author.imageUrl} className="h-10 w-10 rounded-full bg-gray-50" />
                          <div className="text-sm leading-6">
                            <p className="font-semibold text-gray-900">
                              <a href={post.author.href}>
                                <span className="absolute inset-0" />
                                {post.author.name}
                              </a>
                            </p>
                            <p className="text-gray-600">{post.author.role}</p>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
    )
}




  
  
   
  
  