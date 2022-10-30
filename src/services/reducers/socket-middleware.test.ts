import { TApplicationActions } from "../actions";
import { initialWsState, wsReducer } from "./socket-middleware";

describe('socket middleware reducer', () => {
    const event : Event = {
        bubbles: false,
        cancelBubble: false,
        cancelable: false,
        composed: false,
        currentTarget: null,
        defaultPrevented: false,
        eventPhase: 0,
        isTrusted: false,
        returnValue: false,
        srcElement: null,
        target: null,
        timeStamp: 0,
        type: "",
        composedPath: function (): EventTarget[] {
            throw new Error("Function not implemented.");
        },
        initEvent: function (type: string, bubbles?: boolean | undefined, cancelable?: boolean | undefined): void {
            throw new Error("Function not implemented.");
        },
        preventDefault: function (): void {
            throw new Error("Function not implemented.");
        },
        stopImmediatePropagation: function (): void {
            throw new Error("Function not implemented.");
        },
        stopPropagation: function (): void {
            throw new Error("Function not implemented.");
        },
        AT_TARGET: 0,
        BUBBLING_PHASE: 0,
        CAPTURING_PHASE: 0,
        NONE: 0
    }
    
    it('Should return initial state', () => {
        const action : TApplicationActions = { type: "CLOSE_ORDER"};
        expect(wsReducer(undefined, action)).toEqual(initialWsState);
    });

    it('Should return requested connection state', () => {
        const action: TApplicationActions = {
            type: 'WS_CONNECTION_START',
            payload: ''
        };
        
        const expectedState = {
            ...initialWsState,
            request: true
        };

        expect(wsReducer(initialWsState, action)).toEqual(expectedState);
    });

    it('Should return connection state on success', () => {
        const action: TApplicationActions = {
            type: 'WS_CONNECTION_SUCCESS',
            payload: event
        };
        
        const expectedState = {
            ...initialWsState,
            error: undefined,
            wsConnected: true,
        };

        expect(wsReducer(initialWsState, action)).toEqual(expectedState);
    });

    it('Should return connection state on error', () => {
        const action: TApplicationActions = {
            type: 'WS_CONNECTION_ERROR',
            payload: event
        };
        
        const expectedState = {
            ...initialWsState,
            error: event
        };

        expect(wsReducer(initialWsState, action)).toEqual(expectedState);
    });

    it('Should return connection state on close', () => {
        const action: TApplicationActions = {
            type: 'WS_CONNECTION_CLOSED',
            payload: event
        };
        
        const expectedState = {
            ...initialWsState,
        };

        expect(wsReducer(initialWsState, action)).toEqual(expectedState);
    });

    it('Should return connection state on incoming message', () => {
        const message = JSON.stringify({
            success: false,
            orders: [],
            total: 0,
            totalToday: 0
        });
        
        const action: TApplicationActions = {
            type: 'WS_GET_MESSAGE',
            payload: message
        };
        
        const expectedState = {
            ...initialWsState,
            error: undefined,
        };

        expect(wsReducer(initialWsState, action)).toEqual(expectedState);
    });
});