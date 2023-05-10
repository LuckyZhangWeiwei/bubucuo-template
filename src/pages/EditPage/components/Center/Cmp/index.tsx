import React from 'react'
import { ICmpWithKey } from 'src/store/editStore/editStoretyps'
import { isImgComponent, isTextComponent } from '../../LeftSider'
import { ImgCmp, TextCmp } from './CmpDetail'

interface ICmpPorps {
    cmp:ICmpWithKey,
    zIndex:number
}

export default function Cmp(props:ICmpPorps) {
    const { cmp,zIndex } = props
  return (
    <div className='absolute' style={{...cmp.style,zIndex:zIndex}}>

        {
            cmp.type === isTextComponent &&<TextCmp value={cmp.value}/>
        }
        {
            cmp.type === isImgComponent &&<ImgCmp value={cmp.value}/>
        }
        {/* {
            cmp.type === isTextComponent &&<TextCmp value={cmp.value}/>
        }
        {
            cmp.type === isImgComponent &&<ImgCmp value={cmp.value}/>
        } */}
    </div>
  )
}
