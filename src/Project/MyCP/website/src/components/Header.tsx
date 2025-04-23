import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Field,
  ImageField,
  Link,
  LinkField,
  NextImage,
  RichText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { CollapseType } from 'lib/component-props';
import { usePathname } from 'next/navigation';
import CustomLink from '../shared/CustomLink';

interface SubMenu {
  Active: boolean;
  Heading: Field<string>;
  Description: Field<string>;
  Link: LinkField;
  Child: SubMenu[];
}

type HeaderProps = {
  fields: {
    Search: LinkField;
    Logo: ImageField;
    Login: LinkField;
    Links: SubMenu[];
  };
};

type Links = SubMenu[];

export const Default = ({ fields }: HeaderProps): JSX.Element => {
  const [headerTop, setHeaderTop] = useState(0);
  const [headerData, setHeaderData] = useState<Links>(fields.Links);
  const [search, setSearch] = useState(false);
  const navRef = useRef<HTMLInputElement>(null);
  const offCanvasRef = useRef<HTMLInputElement>(null);
  const headerMenuRef = useRef<HTMLUListElement>(null);
  const backdropRef = useRef<HTMLInputElement>(null);
  const fixedTopClass = 'fixed-top';
  const megaMenuClass = 'collapse show';
  const hide = 'hide';
  const collapseRef = useRef<CollapseType | null>(null);
  const pathName = usePathname();

  useEffect(() => {
    document.body.className += ' before-login';
  }, []);

  const fixGuestHeaderOnScroll = useCallback(() => {
    if (navRef.current) {
      if (window.scrollY > headerTop) {
        navRef.current.classList.add(fixedTopClass);
        document.body.style.paddingTop = `${navRef.current.clientHeight}px`;
      } else {
        navRef.current.classList.remove(fixedTopClass);
        document.body.style.paddingTop = '0px';
      }
    }
  }, [headerTop]);

  const collapseHeaderMenu = useCallback(() => {
    if (headerMenuRef.current) {
      const menuElement = [...headerMenuRef.current.children].filter(
        (el) => el.children.length > 1
      );
      const megaMenuElement = [...menuElement].filter((el) =>
        el.children[1].className.includes(megaMenuClass)
      );
      [...megaMenuElement].map((collapseEl) => {
        const bsCollapse = new collapseRef.current!(collapseEl.children[1], {
          toggle: false,
        });
        bsCollapse.hide();
        return true;
      });
    }
  }, []);

  const hideBackDrop = useCallback(() => {
    if (backdropRef.current) {
      backdropRef.current.classList.add(hide);
    }
  }, []);

  const closeMegaMenu = useCallback(
    (_?: React.MouseEvent<HTMLElement>, id?: string) => {
      collapseHeaderMenu();
      hideBackDrop();
      if (id) {
        if (id === '0') {
          handleRouteChange('/');
        }
      }
    },
    [collapseHeaderMenu, hideBackDrop]
  );

  const handleRouteChange = useCallback((pathName: string) => {
    setSearch(fields.Search?.value?.href?.toLowerCase() === pathName.toLowerCase());
    const updatedHeaderData: Links = [...headerData].map((link: SubMenu) => {
      // Check if the clicked ID matches the parent
      if (link?.Link?.value?.href?.toLowerCase() === pathName.toLowerCase()) {
        return {
          ...link,
          Active: true,
        };
      }

      // Check if the clicked ID matches any child
      if (link.Child && link.Child.length > 0) {
        const isChildActive = link.Child.some(
          (child) => child.Link.value.href?.toLowerCase() === pathName.toLowerCase()
        );
        return {
          ...link,
          Active: isChildActive,
        };
      }

      // Deactivate all other links
      return {
        ...link,
        Active: false,
      };
    });

    setHeaderData(updatedHeaderData);
  }, []);

  useEffect(() => {
    handleRouteChange(pathName.toLowerCase());
  }, [pathName, handleRouteChange]);

  // Dynamically import Bootstrap's Collapse on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('bootstrap').then(({ Collapse }) => {
        collapseRef.current = Collapse;
      });
    }
  }, []);

  // This will call on page load
  useEffect(() => {
    if (navRef.current) {
      setHeaderTop(navRef.current.offsetTop);
    }
    fixGuestHeaderOnScroll();
  }, [fixGuestHeaderOnScroll]);

  // This will set event on Page Load
  useEffect(() => {
    window.addEventListener('scroll', fixGuestHeaderOnScroll);
    window.addEventListener('resize', fixGuestHeaderOnScroll);
    return () => {
      window.removeEventListener('scroll', fixGuestHeaderOnScroll);
      window.removeEventListener('resize', fixGuestHeaderOnScroll);
    };
  }, [fixGuestHeaderOnScroll]);

  // This will set bootstrap event on page load
  useEffect(() => {
    let localRef = null;
    if (offCanvasRef.current) localRef = offCanvasRef.current;

    if (localRef) {
      localRef.addEventListener('show.bs.offcanvas', collapseHeaderMenu);
      localRef.addEventListener('hidden.bs.offcanvas', collapseHeaderMenu);
    }

    return () => {
      if (localRef) {
        localRef.removeEventListener('show.bs.offcanvas', collapseHeaderMenu);
        localRef.removeEventListener('hidden.bs.offcanvas', collapseHeaderMenu);
      }
    };
  }, [collapseHeaderMenu]);

  // This will required to handle backdrop functionality
  useEffect(() => {
    const showBackDrop = () => {
      if (window.innerWidth >= 992) {
        collapseHeaderMenu();
      }
      if (backdropRef.current) {
        backdropRef.current.classList.remove(hide);
      }
    };

    let localRef = null;
    if (headerMenuRef.current) localRef = headerMenuRef.current;

    if (localRef) {
      localRef.addEventListener('show.bs.collapse', showBackDrop);
      localRef.addEventListener('hidden.bs.collapse', hideBackDrop);
    }

    return () => {
      if (localRef) {
        localRef.removeEventListener('show.bs.collapse', showBackDrop);
        localRef.removeEventListener('hidden.bs.collapse', hideBackDrop);
      }
    };
  }, [collapseHeaderMenu, hideBackDrop]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className={`component content col-12 header`}>
          <div className="component-content">
            <div className="row">
              <div
                ref={backdropRef}
                onClick={() => collapseHeaderMenu()}
                className="backdrop hide"
              ></div>
              <nav ref={navRef} className="navbar navbar-expand-lg">
                <div className="container remove-tablet-default-padding">
                  <div className="d-flex justify-content-between align-items-center navbar-section">
                    <a
                      className="navbar-toggler"
                      type="button"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#navbarNavDropdown"
                      aria-controls="navbarNavDropdown"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    ></a>

                    <CustomLink
                      href="/"
                      onClick={closeMegaMenu}
                      title="Home"
                      className="navbar-brand"
                    >
                      <NextImage
                        field={fields.Logo}
                        className="logo"
                        height={0}
                        width={0}
                        style={{ height: '38px', width: 'auto' }} // optional
                        sizes="100vw"
                        priority
                      />
                    </CustomLink>

                    <div
                      className="offcanvas offcanvas-start"
                      ref={offCanvasRef}
                      tabIndex={-1}
                      id="navbarNavDropdown"
                    >
                      <div className="offcanvas-header">
                        <a
                          className="navbar-toggler"
                          type="button"
                          data-bs-dismiss="offcanvas"
                          aria-label="Close"
                        ></a>

                        <CustomLink
                          href="/"
                          onClick={closeMegaMenu}
                          title="Home"
                          className="navbar-brand"
                        >
                          <NextImage
                            field={fields.Logo}
                            className="logo"
                            alt="Colonial Penn"
                            height={0}
                            width={0}
                            style={{ height: '38px', width: 'auto' }} // optional
                            sizes="100vw"
                            priority
                          />
                        </CustomLink>
                      </div>
                      <div className="offcanvas-body">
                        <ul ref={headerMenuRef} className="navbar-nav header-menu">
                          {headerData.map((link: SubMenu, index: number) =>
                            link.Child && link.Child.length > 0 ? (
                              <li className="nav-item" key={index}>
                                <a
                                  className={`nav-link collapsed  ${link.Active ? 'active' : ''}`}
                                  data-bs-toggle="collapse"
                                  data-bs-target={`#${link.Heading?.value.toLowerCase()}-collapse`}
                                  role="button"
                                  aria-expanded="false"
                                  aria-controls="resources-collapse"
                                >
                                  <span>{link.Heading?.value}</span>
                                </a>
                                <div
                                  className="collapse mega-menu-dropdown"
                                  id={`${link.Heading?.value.toLowerCase()}-collapse`}
                                >
                                  <div className="container">
                                    <ul className="mega-menu">
                                      {link.Child.map((childLink, childIndex: number) => (
                                        <li className="mega-menu-item" key={childIndex}>
                                          <Link
                                            className="nav-link"
                                            field={childLink.Link}
                                            onClick={closeMegaMenu}
                                          ></Link>
                                          <RichText
                                            tag="p"
                                            field={childLink.Description}
                                          ></RichText>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </li>
                            ) : (
                              <li className="nav-item" key={index}>
                                <Link
                                  className={`nav-link  ${link.Active ? 'active' : ''}`}
                                  onClick={closeMegaMenu}
                                  field={link.Link}
                                ></Link>
                              </li>
                            )
                          )}
                        </ul>
                        <ul className="navbar-nav navbar-right">
                          <li className="header-search">
                            <Link
                              onClick={(_) => closeMegaMenu(_, '0')}
                              field={fields.Search}
                              className={search ? 'active' : ''}
                            ></Link>
                          </li>

                          <li className="login-button">
                            <Link
                              field={fields.Login}
                              onClick={closeMegaMenu}
                              className="btn btn-primary"
                            ></Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex d-lg-none">
                    <ul className="navbar-nav navbar-right">
                      <li className="header-search">
                        <Link
                          field={fields.Search}
                          onClick={(_) => closeMegaMenu(_, '0')}
                          className={search ? 'active' : ''}
                        ></Link>
                      </li>

                      <li className="login-button d-none d-md-block">
                        <Link
                          field={fields.Login}
                          onClick={closeMegaMenu}
                          className="btn btn-primary"
                        ></Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
