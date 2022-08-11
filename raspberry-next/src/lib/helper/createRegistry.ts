type ConstructorParams = never | unknown[]
type ConstructorParamsGenerator<P extends ConstructorParams> = P | (() => P)
type ClassWithConstructorParams<P extends ConstructorParams, I = unknown> = new(...args: P) => I

export function createRegistry<P extends ConstructorParams>(constructorParams?: ConstructorParamsGenerator<P>) {
    const instances: InstanceType<ClassWithConstructorParams<P>>[] = [];

    function createConstructorParams(): P {
        if (!constructorParams) {
            return [] as never
        }
        if (typeof constructorParams === 'function') {
            return constructorParams()
        }
        return constructorParams
    }

    function ensureCorrectConstructorParams(Class: ClassWithConstructorParams<P>, params: P) {
        if (Class.length !== params.length) {
            throw new Error('Unsufficient constructor arguments provided')
        }
    }

    function getInstance<SC extends ClassWithConstructorParams<P>>(Class: SC): InstanceType<SC> {
        let instance = instances.find(instance => instance instanceof Class)
        if (!instance) {
            const constructorParams = createConstructorParams()
            ensureCorrectConstructorParams(Class, constructorParams)
            instance = new Class(...constructorParams)
            instances.push(instance)
        }
        return instance as InstanceType<SC>
    }

    return getInstance
}
