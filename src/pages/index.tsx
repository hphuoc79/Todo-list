import * as Tabs from '@radix-ui/react-tabs'
import { useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import clsx from 'clsx'

import { CreateTodoForm } from '@/client/components/CreateTodoForm'
import { TodoList } from '@/client/components/TodoList'

/**
 * QUESTION 6:
 * -----------
 * Implement quick filter/tab feature so that we can quickly find todos with
 * different statuses ("pending", "completed", or both). The UI should look like
 * the design on Figma.
 *
 * NOTE:
 *  - For this question, you must use RadixUI Tabs component. Its Documentation
 *  is linked below.
 *
 * Documentation references:
 *  - https://www.radix-ui.com/docs/primitives/components/tabs
 */

export type TabType = 'all' | 'pending' | 'completed'

const tabList: { value: TabType; name: string }[] = [
  { value: 'all', name: 'All' },
  { value: 'pending', name: 'Pending' },
  { value: 'completed', name: 'Completed' },
]

const Index = () => {
  const query = useSearchParams()
  const router = useRouter()

  const tabType = useMemo(() => {
    if (query.get('tab') === 'pending') {
      return 'pending'
    }
    if (query.get('tab') === 'completed') {
      return 'completed'
    }
    return 'all'
  }, [query])

  const handleChangeTab = (value: string) => {
    router.push('/?tab=' + value)
  }
  return (
    <main className="mx-auto w-[480px] pt-12">
      <div className="rounded-12 bg-white p-8 shadow-sm">
        <h1 className="text-center text-4xl font-extrabold text-gray-900">
          Todo App
        </h1>

        <Tabs.Root
          className="TabsRoot "
          value={tabType}
          onValueChange={handleChangeTab}
        >
          <Tabs.List className="flex pt-10">
            {tabList.map((item) => (
              <Tabs.Trigger
                key={item.value}
                className={clsx(
                  'mr-2 gap-2 px-5 py-2',
                  'rounded-[9999px] border border-[#334155] font-bold',
                  'flex items-center justify-center',
                  tabType === item.value
                    ? 'bg-gray-700 text-white'
                    : 'text-[#334155]'
                )}
                value={item.value}
              >
                {item.name}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          <TodoList tabType={tabType} />
        </Tabs.Root>

        <div className="pt-10">
          <CreateTodoForm />
        </div>
      </div>
    </main>
  )
}

export default Index
