import "./assets/main.css";
import '../public-path.js'
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import {
  renderWithQiankun,
  qiankunWindow,
} from "vite-plugin-qiankun/dist/helper";

let instance = null;

function render(props = {}) {
  console.log(props, "propssss");
  const { container } = props;
  // 为了避免根id#app与其他DOM冲突，需要限制查找范围
  instance = createApp(App)
    .use(router)
    .mount(container ? container.querySelector("#micro-app") : "#micro-app");
}

const initQianKun = () => {
  renderWithQiankun({
    mount(props) {
      const { container } = props;
      console.log("子应用重新挂载");
      render(container);
    },

    bootstrap() {},

    unmount(props) {
      console.log("子应用即将卸载", props);
      //   ReactDOM.unmountComponentAtNode(
      //     props.container
      //       ? props.container.querySelector("#app")
      //       : document.getElementById("app")
      //   );
      //   instance.unmount();
      //   instance.$destroy();
      //   instance.$el.innerHTML = "";
      //   instance = null;
    },
  });
};

//--------- 生命周期函数------------//
// export async function bootstrap() {
//   console.log("[vue] vue app bootstraped");
// }
// export async function mount(props) {
//   console.log("[vue] props from main framework", props);
//   render(props);
// }
// export async function unmount() {
//   instance.$destroy();
//   instance.$el.innerHTML = "";
//   instance = null;
// }
// createApp(App).use(router).mount('#app')
qiankunWindow.__POWERED_BY_QIANKUN__ ? initQianKun() : render();
