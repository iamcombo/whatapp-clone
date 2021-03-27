import { Circle } from 'better-react-spinkit'

export default function Loading() {
  return (
    <center style={{display: 'grid', placeItems: 'center', height: '100vh'}}>
      <div>
        <img 
          src='https://i.pinimg.com/originals/33/b6/53/33b6530c47f744f110e5070ba9b893d2.png'
          alt='loading...'
          style={{
            marginBottom: 10
          }}
          height={200}
          width={200}
        />
        <Circle 
          color="#3CBC28"
          size={60}
        />
      </div>
    </center>
  )
}