import { gql, useQuery } from '@apollo/client'
import { Columns, Rows } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { Lesson } from './Lesson'

const GET_LESSON_QUERY = gql`
  query MyQuery {
    lessons(orderBy: availableAt_ASC, stage: PUBLISHED) {
      id
      slug
      title
      lessonType
      availableAt
    }
  }
`

interface GetLessonsQueryResponse {
  lessons: {
    id: string;
    title: string;
    slug: string;
    availableAt: string;
    lessonType: 'live' | 'class'
  }[]
}

export function Sidebar() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const { data } = useQuery<GetLessonsQueryResponse>(GET_LESSON_QUERY);
  
  return (
    <aside className=" bg-gray-700 p-6 border-l border-gray-600">
      <div className='flex justify-end'>
        <button onClick={() => setIsOpenMenu((prev) => !prev)}>
          {isOpenMenu
            ? (<Columns size={24}/>)
            : (<Rows size={24}/>)
          }
        </button>
      </div>
      <div className={isOpenMenu ? 'showMenuNav' : 'hideMenuNav'}>
        <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
          Cronograma de aulas
        </span>

        <div className='flex flex-col gap-8'>
          {data?.lessons.map(lesson => {
            return (
              <Lesson key={lesson.id}
                title={lesson.title}
                slug={lesson.slug}
                availableAt={new Date(lesson.availableAt)}
                type={lesson.lessonType}
              />
            )
          })}
        </div>
      </div>

      <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        w-[348px];
      }
    `}</style>
    </aside>
  )
}