import { useRoute } from 'solid-navigation';

export default function Home() {
  const route = useRoute();
  const message = 'Blank SolidJS App'

  return (
    <>
      <actionbar title={route.name} />
      <gridlayout>
        <label
          style={{
            fontSize: 20,
            horizontalAlignment: 'center',
            verticalAlignment: 'middle',
          }}
        >
          <formattedstring>
            <span
              className="fas"
              text={String.fromCharCode(0xf135)}
              style={{
                color: '#3A53FF',
              }}
            />
            <span text={` ${message}`} />
          </formattedstring>
        </label>
      </gridlayout>
    </>
  )
}
