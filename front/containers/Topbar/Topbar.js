import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import appActions from '@iso/redux/app/actions';
import TopbarSearch from './TopbarSearch';
import TopbarUser from './TopbarUser';
import TopbarWrapper from './Topbar.styles';

import naverBlog from '@iso/assets/images/naverBlog.png';
import github from '@iso/assets/images/github.png';

const { Header } = Layout;
const { toggleCollapsed } = appActions;

class Topbar extends Component {
  render() {
    const { toggleCollapsed, url, customizedTheme, locale } = this.props;
    const collapsed = this.props.collapsed && !this.props.openDrawer;
    const styling = {
      background: customizedTheme.backgroundColor,
      position: 'fixed',
      width: '100%',
      height: 70,
    };
    return (
      <TopbarWrapper>
        <Header
          style={styling}
          className={
            collapsed ? 'isomorphicTopbar collapsed' : 'isomorphicTopbar'
          }
        >
          <div className="isoLeft">
            <button
              className={
                collapsed ? 'triggerBtn menuCollapsed' : 'triggerBtn menuOpen'
              }
              style={{ color: customizedTheme.textColor }}
              onClick={toggleCollapsed}
            />
          </div>

          <ul className="isoRight">
            {/* <li className="isoSearch">
              <TopbarSearch locale={locale} />
            </li> */}
            <li
              className="isoUser"
            >
              <a href="https://blog.naver.com/cjstkdgml33" target="_blank">
                <div className="isoImgWrapper">
                  <img alt="blog" src={naverBlog} />
                </div>
              </a>
            </li>

            <li
              className="isoUser"
            >
              <a href="https://github.com/devfloors/devfloors" target="_blank">
                <div className="isoImgWrapper">
                  <img alt="github" src={github} />
                </div>
              </a>
            </li>

            <li
              onClick={() => this.setState({ selectedItem: 'user' })}
              className="isoUser"
            >
              <TopbarUser locale={locale} />
            </li>
          </ul>
        </Header>
      </TopbarWrapper>
    );
  }
}

export default connect(
  state => ({
    ...state.App,
    locale: state.LanguageSwitcher.language.locale,
    customizedTheme: state.ThemeSwitcher.topbarTheme,
  }),
  { toggleCollapsed }
)(Topbar);
