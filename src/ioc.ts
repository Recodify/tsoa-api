import { Controller } from 'tsoa';
import { Container, inject, interfaces, decorate, injectable, multiInject } from 'inversify';
import { autoProvide, makeProvideDecorator, makeFluentProvideDecorator } from 'inversify-binding-decorators';
import 'reflect-metadata';

decorate(injectable(), Controller);

type Identifier = string | symbol | interfaces.Newable<any> | interfaces.Abstract<any>;

const iocContainer = new Container();

const provide = makeProvideDecorator(iocContainer);
const fluentProvider = makeFluentProvideDecorator(iocContainer);

const ProvideNamed = (identifier: Identifier, name: string) => {
   return fluentProvider(identifier).whenTargetNamed(name).done();
}

const ProvideSingleton = (identifier: Identifier) => {
     console.log(identifier);
     return fluentProvider(identifier).inSingletonScope().done();
}

export { iocContainer, autoProvide, provide, ProvideSingleton, ProvideNamed, inject, decorate, injectable, multiInject, };
