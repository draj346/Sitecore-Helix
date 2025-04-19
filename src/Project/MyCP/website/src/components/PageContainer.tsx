import React from 'react';
import { Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export const Default = (props: ComponentProps): JSX.Element => (
  <div id="content" className="container-fluid">
    <div className="row">
      <div className="component row-splitter">
        <div className="section-light-blue-background remove-container-fluid-spacing container-fluid">
          <div className="row">
            <div className="row">
              <div className="component row-splitter">
                <div className=" remove-container-fluid-spacing container-fluid">
                  <div className="row">
                    <div className="row">
                      <Placeholder name="placeholder-breadcrumb" rendering={props.rendering} />
                    </div>
                  </div>
                </div>
                <div className=" remove-container-fluid-spacing container-fluid">
                  <div className="row">
                    <div className="row">
                      <Placeholder name="placeholder-heading" rendering={props.rendering} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" remove-container-fluid-spacing container-fluid">
          <div className="row">
            <div className="row">
              <Placeholder name="placeholder-content" rendering={props.rendering} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
