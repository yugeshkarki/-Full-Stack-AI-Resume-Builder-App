import { Briefcase, Plus, Trash2 } from 'lucide-react'
import React from 'react'

const ExperienceForm = ({data, onchange}) => {

    const addExperience=()=>{
        const newExperiences={
            company:"",
            position:"",
            stsrt_date:"",
            end_date:"",
            description:'',
            is_current:false

        };
        onChange=([...data,newExperience])
    }
    const removeExperience=(index)=>{
   const updated=data.filter((_, i)=> i!== index);
   onchange(updated)
    }

     const updateExperience=(index,field ,value)=>{
   const updated=[...data]
   updated[index]={...updated[index], [field]:value}
   onchange(updated)
    }

  return (
  <div className='space-y-4'>
      <div className='flex items-center justify-between'>
         <div>
            <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Professional Experience</h3>
           <p className='text-sm text-gray-500'>Add your job experience</p>
         
         </div>
         <button onClick={addExperience} className='flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors '>
            <Plus className='size-4'/>
        Add Experience
         </button>
      </div>
     {data.length===0 ?(
        <div className='text-center py-8 text-gray-500'>
        <Briefcase className='w-12 h-12 mx-auto mb-3 text-gray-300 '/>
        <p> No work experience added yet</p>
        <p className='text-sm'>Click "Add Experience" to get started</p>
     </div>
     ):(
        <div className='space-y-4'> 
{data.map(( experience ,index)=>(
    <div key={index} className='p-4 border border-gray-200 rounded-lg space-y-3'>
     <div className='flex justify-between items-start'>
   <h4>Experience #(index+1)</h4>
   <button
   onClick={()=>removeExperience(index)} className=''>
    <Trash2 className='sixe-4'/>
   </button>
     </div>
     <div className='grid md:grid-cols-2 gap-3'>
        <input  value={experience.company || ""} type='text' onChange={(e)=>updateExperience(index,"company,e.target.value")} 
        placeholder='company name' className='px-3 py-2 text-sm rounded-lg'/>

<input  value={experience.position || ""} type='text' onChange={(e)=>updateExperience(index,"position",e.target.value)} 
        placeholder='company name' className='px-3 py-2 text-sm rounded-lg'/>

        <input  value={experience.start_date|| ""} type='month' onChange={(e)=>updateExperience(index,"start_date",e.target.value)} 
        placeholder='company name' className='px-3 py-2 text-sm rounded-lg'/>

                <input  value={experience.end_datedate|| ""} type='month'disabled={experience.is_current} onChange={(e)=>updateExperience(index,"end_date",e.target.value)} 
        placeholder='company name' className='px-3 py-2 text-sm rounded-lg disabled:bg-gray-100'/>
     </div>
    </div>
))}
        </div>
     )}
      </div>
    
  )
}

export default ExperienceForm
