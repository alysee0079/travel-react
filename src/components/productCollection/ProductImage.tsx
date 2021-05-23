import React from 'react'
import { Image, Typography } from 'antd'
import { withRouter, RouteComponentProps, Link } from 'react-router-dom'

interface PropsType extends RouteComponentProps {
  id: string | number
  size: string
  title: string
  imageSrc: string
  price: string | number
  history
  location
  match
}

const ProductImageComponent: React.FC<PropsType> = ({ id, size, title, imageSrc, price, history, location, match }) => {
  // console.log(history)
  // console.log(location)
  // console.log(match)
  return (
    // Link 跳转方案
    <Link to={`detail/${id}`}>
      {size === 'large' ? <Image src={imageSrc} height={285} width={490} /> : <Image src={imageSrc} height={120} width={240} />}
      <div>
        <Typography.Text type="secondary">{title.slice(0, 25)}</Typography.Text>
        <Typography.Text type="danger" strong>
          ¥{price}起
        </Typography.Text>
      </div>
    </Link>
    // history 方案
    // <div onClick={() => history.push(`detail/${id}`)}>
    //   {size === 'large' ? <Image src={imageSrc} height={285} width={490} /> : <Image src={imageSrc} height={120} width={240} />}
    //   <div>
    //     <Typography.Text type="secondary">{title.slice(0, 25)}</Typography.Text>
    //     <Typography.Text type="danger" strong>
    //       ¥{price}起
    //     </Typography.Text>
    //   </div>
    // </div>
  )
}

export const ProductImage = withRouter(ProductImageComponent)
