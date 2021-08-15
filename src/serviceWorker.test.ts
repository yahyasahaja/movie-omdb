import rewire from "rewire"
const serviceWorker = rewire("./serviceWorker")
const checkValidServiceWorker = serviceWorker.__get__("checkValidServiceWorker")
// @ponicode
describe("serviceWorker.register", () => {
    test("0", () => {
        let callFunction: any = () => {
            serviceWorker.register({ onSuccess: () => undefined, onUpdate: () => undefined })
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("checkValidServiceWorker", () => {
    test("0", () => {
        let callFunction: any = () => {
            checkValidServiceWorker("http://base.com", { onSuccess: () => undefined, onUpdate: () => undefined })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            checkValidServiceWorker("https://", { onSuccess: () => undefined, onUpdate: () => undefined })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            checkValidServiceWorker("http://www.example.com/route/123?foo=bar", { onSuccess: () => undefined, onUpdate: () => undefined })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            checkValidServiceWorker("ponicode.com", { onSuccess: () => undefined, onUpdate: () => undefined })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            checkValidServiceWorker("Www.GooGle.com", { onSuccess: () => undefined, onUpdate: () => undefined })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            checkValidServiceWorker("", { onSuccess: () => undefined, onUpdate: () => undefined })
        }
    
        expect(callFunction).not.toThrow()
    })
})
