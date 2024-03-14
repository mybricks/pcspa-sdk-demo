import {render} from 'react-dom'
import {ConfigProvider} from 'antd'
import zhCN from 'antd/es/locale/zh_CN';
import {render as renderUI} from '@mybricks/render-web'//使用Mybricks-web渲染器

// import {render as renderUI} from '../../render-web/src/'


//连接器运行时
import {call, mock} from '@mybricks/plugin-connector-http'
// import {call as callDomainHttp} from '@mybricks/plugin-connector-domain';

//准备编译的数据，结构为 {slot,script}，根据 toJSON 导出
let json = localStorage.getItem('--preview--')

if (!json) {
  throw new Error('数据错误')
}

try {
  json = JSON.parse(json)
} catch (ex) {
  throw ex
}

// const {render: renderUI} = window._mybricks_render_web
// window.moment.locale('zh-cn');

//----------------------------------------------------------------------------

render(<Page/>, document.querySelector('#root'))

function Page() {
  return (
    <ConfigProvider locale={zhCN}>
      {
        renderUI(json, {//渲染Mybricks toJSON的结果
          env: {//配置组件运行的各类环境信息
            i18n(text) {//多语言
              return text
            },
            callConnector: mock,
            getQuery() {
              return 'aaa'
            },
            events: [//配置事件
              {
                type: 'jump',
                title: '跳转到',
                exe({options}) {
                  const page = options.page
                  if (page) {
                    window.location.href = page
                  }
                }
              },
            ]
          },
          //observable
          // observable: RXUI.observable,
        })
      }
    </ConfigProvider>
  )
}