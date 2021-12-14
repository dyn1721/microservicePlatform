import './UserLayout.less'
import logo from '@/assets/logo.png';
const UserLayout = {
  props: {
    logo: { default: logo, types: String }
  },
  render() {
    return (
      <div class="ai-user-layout-container">
        <div class="content">
          <div class="top">
            <div class="header">
              <img alt="logo" class="logo" src={this.logo} />
              <span class="title">
                MICRO UNITE
              </span>
            </div>
            <div class="desc">
              基于微服务架构的基础业务平台
            </div>
          </div>
          <router-view />
        </div>
      </div>
    )
  }
}
export default UserLayout