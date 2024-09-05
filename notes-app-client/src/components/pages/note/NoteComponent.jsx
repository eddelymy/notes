import { useState, useEffect, useRef } from "react"
import DeleteNote from "./DeleteNote"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

const NoteComponent = ({ _id,category,label, title, content, getNotes }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showExpandButton, setShowExpandButton] = useState(false)
  const contentRef = useRef(null)

  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight
      setShowExpandButton(contentHeight > 250)
    }
  }, [content])

  return (
    <div className="flex flex-col rounded-2xl px-4 border-2 py-6 w-full h-full max-w-[800px] min-w-[300px] hover:-translate-y-1 hover:scale-10 duration-300" style={{ background: category.value }}>
      <div>
      <span 
          className="float-start font-thin text-gray-100 rounded-md px-2 py-1 bg-[#020617] -rotate-6">
          {category.label}
        </span>
      </div>
      <div className="mt-6 h-full">
        <h1 className="text-2xl font-serif">{title}</h1>
        <div 
          ref={contentRef}
          className={`mt-6 transition-all duration-300 ${isExpanded ? 'max-h-none' : 'max-h-[250px] overflow-hidden'}`}
        >
          <div className="prose prose-sm max-w-none text-[13px]" dangerouslySetInnerHTML={{ __html: content }} />
          <div className="mt-3 flex gap-2">
            {label.map(tag=>
              <span key={tag.value} className="text-black font-bold">
                #{tag.label}
              </span>
            )}
          </div>
        </div>
        {showExpandButton && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-500 mt-3"
          >
            {isExpanded ? 'Réduire' : 'Afficher plus'}
          </button>
        )}
      </div>
      
      <div className="border-t border-t-white flex justify-between pt-4 mt-6">
        <DeleteNote noteId={_id} noteDeleted={getNotes}/>
        <button type="button" className="rounded-full text-white text-[12px] bg-[#020617] px-2 py-1">
          <FontAwesomeIcon icon={faEdit} />
        </button>
      </div>
    </div>
  );
};

export default NoteComponent;