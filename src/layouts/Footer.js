import { Layout, Icon } from "ant-design-vue";
import GlobalFooter from '@/components/GlobalFooter';
const { Footer } = Layout;
const FooterView = {
    render(){
        return (
            <Footer style={{ padding: 0 }}>
              <GlobalFooter
                links={[
					{
					  key: 'powered by',
					  title: 'powered by',
					  blankTarget: true,
					},
                  {
                    key: 'VUE',
                    title: 'VUE',
                    href: 'https://cn.vuejs.org/',
                    blankTarget: true,
                  },
				  {
				    key: 'Ant Design',
				    title: 'Ant Design',
				    href: 'https://www.antdv.com/docs/vue/introduce-cn/',
				    blankTarget: true,
				  }
                ]}
                copyright={
                  <div>
                    Copyright <Icon type="copyright" /> 2021 / YYDS team  /  Advanced Software Engineering course project
                  </div>
                }
              />
            </Footer>
          );
    }
}
export default FooterView;
