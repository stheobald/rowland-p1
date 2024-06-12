import React, {useState} from "react"
import { BookmarkIcon } from "@heroicons/react/24/outline"

const ReferenceCard = ({ reference: { text, paragraph, filename, chunk } }) => {
  const [visible, setVisible] = useState(false)
  return (
    <div
      className={`relative basis-full rounded-lg shadow p-4 left-6 ml-1 pl-5 bg-gray-50 flex-column`} onClick={()=>setVisible(!visible)}
    >
      <div className="flex flex-row">
        <BookmarkIcon className="h-6 pr-2"/>
        <b>{filename} (paragraph {paragraph})</b>
      </div>
      {visible && <p>{text}</p>}
    </div>
  )
}

export default ReferenceCard
