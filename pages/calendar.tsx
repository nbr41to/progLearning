import type { NextPage } from 'next';

import { Button } from '@mantine/core';
import { Calendar } from '@mantine/dates';
import { closeAllModals, openModal } from '@mantine/modals';
import dayjs from 'dayjs';
import { useState } from 'react';

import { PostTask } from '@/components/templates/PostTask';

const MyCalendar: NextPage = () => {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <div>
      <h1>Calendar</h1>
      <Calendar value={value} onChange={setValue} />
      <Button
        onClick={() =>
          openModal({
            title: "Post Today's Task",
            children: <PostTask date={value} onClose={closeAllModals} />,
          })
        }
      >
        Add
      </Button>

      <div>
        {/* ここにその日のスケジュール枠 */}
        <h2>{dayjs(value).format('YYYY年MM月DD日')}</h2>
      </div>
    </div>
  );
};

export default MyCalendar;
